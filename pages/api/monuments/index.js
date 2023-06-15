import {getMonuments} from "@/controllers/monuments";
import {authOptions} from "../auth/[...nextauth]"
import {getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt"

export default async function handler(req,res){
    const {method} = req;
    if (method === 'GET') {
        return getMonuments(req,res);
    }
}