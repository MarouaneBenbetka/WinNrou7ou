import {INTEGER, STRING} from 'sequelize';


import db from "../utils/config/dbConnection";

const UserFavouriteEvent = db.define('user_favourite_event', {
    id:{
        type:INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    userId:{
        type:STRING,
    },
    eventId:{
        type:INTEGER
    }
},{timestamps:false});


export default UserFavouriteEvent;