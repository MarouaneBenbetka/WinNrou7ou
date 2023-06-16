import Event from "@/models/event";
import {Op} from "sequelize";
import UserFavouriteEvent from "@/models/userFavouriteEvent";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import User from "@/models/user";
import UserTypes from "@/models/systemUserTypes";

export async function getEvents(req, res) {
    const {page = 0, page_size = 12} = req.query;
    try {
        const events = await Event.findAll({
            where: {date: {[Op.gte]: Date()}},
            attributes: {
                exclude: ["description", "latitude", "longitude"],
                order: [["date", "DESC"]],
                limit: Number(page_size),
                offset: Number(page_size) * Number(page),
            },
        });
        res.status(200).json({events});
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function getEvent(req, res) {
    const {id} = req.query;
    try {
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({message: "event not found"});
        }
        res.status(200).json({event});
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function deleteEvent(req, res) {
    const {id} = req.query;
    try {
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        if (user.type !== UserTypes.ADMIN) {
            return res.status(401).json({message: "unauthorized"});
        }
        const event = await Event.findByPk(id);
        if (!event) {
            return res.status(404).json({message: "event not found"});
        }
        await UserFavouriteEvent.destroy({where: {eventId: id}});
        await event.destroy();
        res.status(200).json({event});
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function createEvent(req, res) {
    const {name, description, latitude, longitude, date, main_image_url,secondary_image_url} = req.query;
    try {
        if (!(name&description&latitude&longitude&date&main_image_url&secondary_image_url)){
            return res.status(400).json({message:"missing info"});
        }
        const session = await getServerSession(req, res, authOptions);
        if (!session) {
            return res.status(401).json({message: "unauthorized"});
        }
        const user = await User.findOne({where: {email: session.user.email}});
        if (user.type !== UserTypes.ADMIN) {
            return res.status(401).json({message: "unauthorized"});
        }
        const event = await Event.create({name, description, latitude, longitude, date: Date.parse(date), main_image_url,secondary_image_url});
        res.status(200).json({event});
    } catch (err) {
        res.status(500).json(err);
    }
}