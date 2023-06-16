import {DATE, DOUBLE, INTEGER, STRING, TEXT} from 'sequelize';


import db from "../utils/config/dbConnection";

const Content360 = db.define('content_360', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:STRING,
        allowNull:false,
    },
    vr_link:{
        type:STRING,
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
    location:{
        type:STRING,
        allowNull:false
    },
    image_url:{
        type:STRING,
        allowNull:false
    },
    wilaya_name:{
        type:STRING
    }
},{timestamps:false});


export default Content360;