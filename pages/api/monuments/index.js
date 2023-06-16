import {createMonument, getMonuments} from "@/controllers/monuments";


export default async function handler(req,res){
    const {method} = req;
    if (method === 'GET') {
        return getMonuments(req,res);
    }
    if (method=== "POST"){
        return createMonument(req,res);
    }
}