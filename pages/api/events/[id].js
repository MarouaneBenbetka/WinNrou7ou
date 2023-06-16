import {deleteEvent, getEvent} from "@/controllers/events";

export default async function handler (req, res) {
    const { method} = req
    if (method === 'GET') {
        return getEvent(req,res);
    }else if (method === "DELETE"){
        return deleteEvent(req,res);
    }
}