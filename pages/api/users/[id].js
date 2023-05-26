//this is the mongoose connection so you will do the same but in using sequelize

//import dbConnect from '../../../utils/mongo'
import {getUser,deleteUser,patchUser} from '@/controllers/user'

export default async function handler (req, res) {
  const { method, cookies } = req
   // await dbConnect()

  const token = cookies.token

  if (method === 'GET') {
    return getUser(req, res)
  } else if (method === 'PATCH') {
    return patchUser(req, res)
  } else if (method === 'DELETE') {
    return deleteUser(req, res)
  }
}