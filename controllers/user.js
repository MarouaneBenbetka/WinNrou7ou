import User from '../models/user'
import {v1} from "uuid"
import generateJWT from "@/functions/generateJWT";
import db from "@/utils/config/dbConnection";
import {compare, genSalt, hash} from "bcrypt"
export async function getUsers (req, res) {
  try {
    // write here you code
    res.status(200).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function addUser (req, res) {
  try {
    console.log(req.body)
    const { email, password,name, image } = req.body;
    const userExists = await User.findOne({where:{email}});
    if (userExists){
      return res.status(409).json({message:"email already in use"});
    }
    const hashedPassword = await hash(password,await genSalt(10))
    const user = await User.create({id:v1(),email,password:hashedPassword,name,image});
    const token = generateJWT(user.id,user.type);
    res.status(200).json({token,userId:user.id,userType:user.type});
  } catch (err) {
    console.log(err);

    res.status(500).json(err)
  }
}

export async function deleteUser (req, res) {
  try {
    res.status(404).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}
export async function patchUser (req, res) {
  try {
    res.status(200).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function getUser (req, res) {
  try {
    const { id } = req.query

    res.status(404).send({ message: `user is not found successfully` })
  } catch (err) {
    res.status(500).json(err)
  }
}

export async function login(req,res){
  try {
    const { email, password } = req.body;
    const user = await User.findOne({where:{email}});
    if (!user){
      return res.status(404).json({message:"invalid email or password"});
    }
    if (await compare(password,user.password)){
      const token = generateJWT(user.id,user.type);
      res.status(200).json({token,userId:user.id,userType:user.type});
    }else{
      return res.status(404).json({message:"invalid email or password"});
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
