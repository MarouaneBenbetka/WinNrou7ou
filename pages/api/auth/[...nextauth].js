import NextAuth from 'next-auth'
import { compare } from 'bcryptjs'
import User from '../../../utils/models/User'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import Error from 'next/error'
import { hashSync } from 'bcryptjs'


export default NextAuth({
    secret: process.env.JWT_SECRET,
    session: {
      jwt: true
    },
    callbacks: {
      async jwt ({ token, user, account }) {
        console.log(token, user, account)
        if (account) {
         // do the same but with new data

        //   token = {
        //     email: user.email,
        //     isDonator: user.isDonator,
        //     id: user.id,
        //     fullname: user.fullname,
        //     image: user.image,
        //     phoneNum: user.phoneNum,
        //     isValid: user.isValid
  
        //   }
        }
        return token
      },
      async session ({ session, token }) {

        // do the same but with new data


        // token?.id ? (session.user.id = token.id) : ''
        // token?.isDonator ? (session.user.isDonator = token.isDonator) : ''
        // token?.fullname ? (session.user.fullname = token.fullname) : ''
        // token?.image ? (session.user.image = token.image) : ''
        // token?.phoneNum ? (session.user.phoneNum = token.phoneNum) : ''
        // !(token?.isValid)? (session.user.isValid = token.isValid):''
  
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


            //here basically you recuperate the email from profile.email and then you loockup for it in the sql db, then if the user eists return it's infos
          
          
          
        }
      })
    ],
    pages: {
      signIn: '/auth/signIn'
    }
  })