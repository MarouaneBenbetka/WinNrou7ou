import Event from "@/models/event";
import {Op} from "sequelize";

export async function getEvents(req, res) {
    const {page=0,page_size=12} = req.query;
    try {
        const events = await Event.findAll({where:{data:{[Op.gte]:Date()}},
            attributes:{exclude:["description","latitude","longitude"],order:[["date","DESC"]],
                limit:Number(page_size),
                offset:Number(page_size)*Number(page)
        }});
        res.status(200).send({events});
    } catch (err) {
        res.status(500).json(err)
    }
}

export async function getEvent(req, res) {
    const {id} = req.query;
    try {
        const event = await Event.findByPk(id);
        res.status(200).send({event});
    } catch (err) {
        res.status(500).json(err)
    }
}
