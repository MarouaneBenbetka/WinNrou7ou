
import {removeEventFromFavourites} from "@/controllers/user";

export default async function handler (req, res) {
    const { method } = req
     if (method==="DELETE"){
        return removeEventFromFavourites(req,res);
    }
}