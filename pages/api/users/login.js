import {login} from "@/controllers/user";

export default async function handler (req, res) {
    if (req.method === 'POST') {
        return login(req,res);
    }else{
        res.json({message:"error while"})
    }
}