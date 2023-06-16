import {DATE, DOUBLE, INTEGER, STRING, TEXT} from 'sequelize';


import db from "../utils/config/dbConnection";

const Event = db.define('event', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:STRING,
        allowNull:false,
    },
    address:{
      type:STRING
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
    main_image_url:{
        type:STRING,
        allowNull:true
    },
    secondary_image_url:{
        type:STRING,
        allowNull:true
    }

},{timestamps:false});


export default Event;