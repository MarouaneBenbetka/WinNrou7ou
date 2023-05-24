import {STRING, DOUBLE, ENUM, SMALLINT, INTEGER, TEXT} from 'sequelize';


import db from "../utils/config/dbConnection";

const Monument = db.define('monument', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:STRING,
        allowNull:true,
    },
    summary:{
        type:TEXT,
        allowNull:true
    },
    latitude:{
        type:DOUBLE,
        allowNull:true
    },
    longitude:{
        type:DOUBLE,
        allowNull:true
    },
    rating:{
        type:SMALLINT,
        defaultValue:0
    }
},{timestamps:false});


export default Monument;