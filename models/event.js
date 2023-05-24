import {DATE, DOUBLE, INTEGER, STRING, TEXT} from 'sequelize';


import db from "../utils/config/dbConnection";

const Event = db.define('event', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:STRING,
        allowNull:false,
    },
    description:{
        type:TEXT,
        allowNull:false
    },
    latitude:{
        type:DOUBLE,
        allowNull:true
    },
    longitude:{
        type:DOUBLE,
        allowNull:true
    },
    date:{
        type:DATE,
        allowNull:false
    },
    image_url:{
        type:STRING,
        allowNull:false
    }

},{timestamps:false});


export default Event;