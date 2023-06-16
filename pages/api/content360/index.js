import {createContent360, getContent360} from "@/controllers/content360";


export default async function handler(req,res){
    const {method} = req;
    if (method === 'GET') {
        return getContent360(req,res);
    }
    if (method=== "POST"){
        return createContent360(req,res);
    }
}