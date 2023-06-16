
import {addUser, getUsers} from "@/controllers/user";
import fillDb from "../../../functions/fillDb"
import db from "@/utils/config/dbConnection";
import makeRelations from "@/models/makeRelations";

export default async function handler (req, res) {
  const { method} = req
  if (method === 'GET') {

    /*await fillDb();
    res.json({message:"hi"})*/
    return getUsers(req, res)
  } else if (method === 'POST') {
    return addUser(req, res)
  }
}