import {ENUM, STRING} from 'sequelize';


import db from "../utils/config/dbConnection";
import UserTypes from "@/models/systemUserTypes";

const User = db.define('user', {
    id:{
        type:STRING,
        primaryKey:true,
    },
    email:{
        type:STRING,
        allowNull:false,
    },
    password:{
        type:STRING,
        allowNull:false,
    },
    name:{
        type:STRING,
        allowNull:false
    },
    type:{
        type:ENUM(UserTypes.ADMIN,UserTypes.TOURIST),
        defaultValue:UserTypes.TOURIST
    },
    gender:{
        type:ENUM("H","F"),
        defaultValue: "H",
    }
},{createdAt:true,updatedAt:false});


export default User;