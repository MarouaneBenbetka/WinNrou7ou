

import {deleteMonument, getMonument} from "@/controllers/monuments";

export default async function handler (req, res) {
    const { method } = req
    if (method === 'GET') {
        return getMonument(req,res)
    }
    if (method === "DELETE"){
        return deleteMonument(req,res);
    }
}