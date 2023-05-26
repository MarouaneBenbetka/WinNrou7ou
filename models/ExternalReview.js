import {INTEGER, STRING, TEXT} from 'sequelize';


import db from "../utils/config/dbConnection";

const ExternalReview = db.define('external_review', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    comment:{
        type:TEXT,
        allowNull:false,
    },
    sender:{
        type:STRING,
        allowNull: false,
    },
    sender_image:{
        type:STRING,
        allowNull:false
    }
},{timestamps:false});


export default ExternalReview;