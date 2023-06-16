import User from '../models/user'
import Event from '../models/event'
import {transporter} from '../utils/config/nodemailer'
import {v1} from "uuid"
import generateJWT from "@/functions/generateJWT";
import db from "@/utils/config/dbConnection";
import {compare, genSalt, hash} from "bcrypt"
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import UserFavouriteEvent from "@/models/userFavouriteEvent";
import Monument from "@/models/monument";
import {QueryTypes} from "sequelize";
import UserFavouriteMonument from "@/models/userFavouriteMonument";
import UserTypes from "@/models/systemUserTypes";

export async function getUsers(req, res) {
    try {
        const {page = 0, page_size = 12} = req.query;
        const session = await getServerSession (req,res,authOptions);
        if (!session){
          return res.status(401).json({message:"unauthorized"});
        }
        const user = await User.findOne({where:{email:session.user.email}});
        if (user.type!==UserTypes.ADMIN){
          return res.status(401).json({message:"unauthorized"});
        }
        const users = await User.findAll({
            limit: Number(page_size),
            offset: Number(page) * Number(page_size),
            order: [["createdAt", "desc"]],
          attributes:{exclude:["password","createdAt"]}
        });
        const page_limit = Math.ceil((await User.count())/Number(page_size));
        res.status(200).json({users,page_limit});
    } catch (err) {
        res.status(500).json(err)
    }
}

const URL = 'http://localhost:3000/api'

export async function addUser(req, res) {
    try {
        console.log(req.body)
        const {email, password, name, image} = req.body;
        const userExists = await User.findOne({where: {email}});
        if (userExists) {
            return res.status(409).json({message: "email already in use"});
        }
        const hashedPassword = await hash(password, await genSalt(10))
        const user = await User.create({id: v1(), email, password: hashedPassword, name, image});
        const token = generateJWT(user.id, user.type);
        const mailData = {
            from: 'ka_kebir@esi.dz',
            to: email,
            subject: `Account Confirmation`,
            html: `<!DOCTYPE html>
      <html>
      <head>
        <title>Email</title>
        <style type="text/css">
          a { color: #336699; }
        </style>
      </head>
      <body>
      Hello ${name} please verify your account :
      <a href="${URL}/auth/verify/${token}" style="color: #FFFFFF;width:100px;height:20px;background-color:#4E4D93;padding:5px 10px">Verify</a>.
      </body>
      </html>`
        }
        console.log(mailData)
        await transporter.sendMail(mailData)
        res.status(200).json({token, userId: user.id, userType: user.type});
    } catch (err) {
        console.log(err);

        res.status(500).json(err)
    }
}

export async function deleteUser(req, res) {
    try {
      const {id} = req.query;
      const session = await getServerSession (req,res,authOptions);
      if (!session){
        return res.status(401).json({message:"unauthorized"});
      }
      const user = await User.findOne({where:{email:session.user.email}});
      if (user.type!==UserTypes.ADMIN){
        return res.status(401).json({message:"unauthorized"});
      }
      const deletedUser = await User.findByPk(id,{attributes:{exclude:["password"]}});
      if (!deletedUser){
        return res.status(404).json({message:"user not found"});
      }
      await UserFavouriteEvent.destroy({where:{userId:id}});
      await UserFavouriteMonument.destroy({where:{userId:id}});
      await deletedUser.destroy();
      res.status(200).json({user:deletedUser});
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function patchUser(req, res) {
    try {
        res.status(200).send({message: `user is not found successfully`})
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function getUser(req, res) {
    try {
        const {id} = req.query
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        const user = await User.findOne({
            where: {email: session.user.email},
            attributes: {exclude: "password type createdAt"}
        });
        if (user.id !== id) {
            return res.status(400).json({message: "bad request"});
        }
        const favouriteMonuments = await db.query(`
      SELECT id,title,rating,wilaya_name from monuments where id in 
      (SELECT monumentId from user_favourite_monuments where userId="${user.id}")
    `, {type: QueryTypes.SELECT});
        for (const item of favouriteMonuments) {
            item.images = await db.query(`
          SELECT url from images where monumentId=${item.id} 
      `, {type: QueryTypes.SELECT});
        }
        const favouriteEvents = await db.query(`
      SELECT * from events where id in 
      (SELECT eventId from user_favourite_events where userId="${user.id}")
    `, {type: QueryTypes.SELECT});
        res.json({user, favouriteEvents, favouriteMonuments});
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(404).json({message: "invalid email or password"});
        }
        if (await compare(password, user.password)) {
            const token = generateJWT(user.id, user.type);
            res.status(200).json({token, userId: user.id, userType: user.type});
        } else {
            return res.status(404).json({message: "invalid email or password"});
        }
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}


export async function addEventToFavourites(req, res) {
    try {
        const {eventId} = req.body;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        if (!eventId) {
            return res.status(400).json({message: "bad request"});
        }
        if (!(await Event.findByPk(eventId))) {
            return res.status(404).json({message: "event not found"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        await UserFavouriteEvent.create({userId: user.id, eventId});
        res.status(200).json({eventId});
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function removeEventFromFavourites(req, res) {
    try {
        const {eventId} = req.query;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        if (!(await Event.findByPk(eventId))) {
            return res.status(404).json({message: "event not found"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        await UserFavouriteEvent.destroy({where: {userId: user.id, eventId}});
        res.status(200).json({eventId});
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function addMonumentToFavourites(req, res) {
    try {
        const {monumentId} = req.body;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        if (!monumentId) {
            return res.status(400).json({message: "bad request"});
        }
        if (!(await Monument.findByPk(monumentId))) {
            return res.status(404).json({message: "monument not found"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        await UserFavouriteMonument.create({userId: user.id, monumentId});
        res.status(200).json({monumentId});
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function removeMonumentFromFavourites(req, res) {
    try {
        const {monumentId} = req.query;
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        if (!(await Monument.findByPk(monumentId))) {
            return res.status(404).json({message: "monument not found"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        await UserFavouriteMonument.destroy({where: {userId: user.id, monumentId}});
        res.status(200).json({monumentId});
    } catch (err) {
        res.status(500).json({message: "internal server error"})
    }
}
