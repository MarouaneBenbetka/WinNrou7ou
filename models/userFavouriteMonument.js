import {INTEGER, STRING} from 'sequelize';


import db from "../utils/config/dbConnection";

const UserFavouriteMonument = db.define('user_favourite_monument', {
    id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:STRING,
    },
    monumentId:{
        type:INTEGER
    }
},{timestamps:false});


export default UserFavouriteMonument;