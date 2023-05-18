//this is the mongoose connection so you will do the same but in using sequelize

//import dbConnect from '../../../utils/mongo'
//import {getUsers, addUser} from '../../../controllers/user'
import makeRelations from "@/models/makeRelations";
import db from "@/utils/config/dbConnection";
db.sync({force:true}).then(r => console.log(r)).catch(err=>{
  console.log(err);
})
makeRelations();
export default async function handler (req, res) {
  const { method, cookies } = req

  const token = cookies.token
  //await dbConnect()
  // this was for mongodb connection you don't need it
  if (method === 'GET') {
    res.json({message:"hi"})
    //return getUsers(req, res)
    // res.status(200).json([{id:1,name:'hello'},{id:2,name:'hello'},{id:3,name:'hello'}])

  } else if (method === 'POST') {
    return addUser(req, res)
  }
}