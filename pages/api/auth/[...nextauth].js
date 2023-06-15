import NextAuth from 'next-auth'
import User from '../../../models/user'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import generateJWT from "@/functions/generateJWT";
import Error from 'next/error'
import { hash, genSalt, compare } from 'bcrypt'
import {v1} from "uuid"



export default NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      jwt: true
    },
    callbacks: {
      async jwt ({ token, user, account }) {
        if (account) {
         // do the same but with new data

          token = {
            email: user.email,
            id: user.id,
            name: user.name,
            image: user.image,
            accessToken:account.access_token
          }
        }
        return token
      },
      async session ({ session, token }) {

        // do the same but with new data
        console.log(session);
        console.log("session : :::::::::::::::::::::");
        token?.email ?  (session.user.email = token.email)    : ''
        token?.id ? (session.user.id  = token.id)   : ''
        token?.name ?  (session.user.name = token.name)  : ''
        token?.image ? (session.user.image  = token.image) : ''
        token?.accessToken ?(session.accessToken = token.accessToken):''

        // token?.id ? (session.user.id = token.id) : ''
        // token?.isDonator ? (session.user.isDonator = token.isDonator) : ''
        // token?.fullname ? (session.user.fullname = token.fullname) : ''
        // token?.image ? (session.user.image = token.image) : ''
        // token?.phoneNum ? (session.user.phoneNum = token.phoneNum) : ''
        // !(token?.isValid)? (session.user.isValid = token.isValid):''
        console.log(session);
        return session
      }
    },
    //Specify Provider
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        async authorize (credentials) {
          //Connect to DB
          {
            try {
              const { email, password } = credentials;
              const user = await User.findOne({where:{email}});

              if (!user){
                throw new Error(JSON.stringify({ errors: 'No user found with the email', status: false }))
              }
              if (await compare(password,user.password)){
                const token = generateJWT(user.id,user.type);
              }else{
                throw new Error(JSON.stringify({ errors: 'Password doesnt match', status: false }))
              }
              return {
                email: user.email,
                image: user.image,
                name: user.name,
                id: user.id
  
            }
            } catch (err) {
              throw new Error(JSON.stringify({ errors: 'No user found with the email', status: false }))
            }



          //Connect to DB
          // connect and then look up for user using credentials.email and credentials.password

          }
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        httpOptions: {
          timeout: 40000
        },
        async profile (profile, tokens) {


          const {email, name, image} = profile
          const user = await User.findOne({where:{email}});


            //here basically you recuperate the email from profile.email and then you loockup for it in the sql db, then if the user eists return it's infos
          

            if (user) {
            return {
                email: user.email,
                image: user.image,
                name: user.name,
                id: user.id

            }

          }

    const hashedPassword = await hash(process.env.DefaultPass,await genSalt(10))
    const newUser = await User.create({id:v1(),email,password:hashedPassword,name,image});
          
    return {
      email: newUser.email,
      image: newUser.image,
      name: newUser.name,
      id: newUser.id

  }
          
        }
      })
    ],
    pages: {
      signIn: '/auth/signIn'
    }
  })