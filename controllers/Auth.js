import User from '../models/user'
import {v1} from "uuid"
import generateJWT from "@/functions/generateJWT";
import db from "@/utils/config/dbConnection";
import {compare, genSalt, hash} from "bcrypt"
import { verify } from '../utils/services/jwtSignVerify'



export async function handleEmailVerification (req, res) {
    const { jwt } = req.query
    console.log(jwt)
  
    const email = process.env.EMAIL
    const secret = process.env.JWT_SECRET
  
  
    if (req.method === 'GET') {
      const verifiedToken = await verify(jwt, new TextEncoder().encode(secret))
      console.log(verifiedToken)
      const user = await User.findOne({ email: verifiedToken.payload })
      console.log('email verified');
      user.isValid = true
      console.log(user)
  
      await user.save()
      return res.status(200).redirect('/login')
    }
    return res.status(400).json({ message: 'Bad request' })
  }