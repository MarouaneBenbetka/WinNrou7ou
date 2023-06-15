import {createMonumentReview, getMonumentReviews} from "@/controllers/monuments";
import {authOptions} from "../../../auth/[...nextauth]"
import {getServerSession} from "next-auth";

export default async function handler(req,res){
    const {method} = req;
    if (method === 'GET') {
        return getMonumentReviews(req,res);
    }
    if (method ==='POST'){

        return createMonumentReview(req,res);
    }
}