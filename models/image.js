import {INTEGER, STRING} from 'sequelize';


import db from "../utils/config/dbConnection";

const Image = db.define('image', {
    id:{
        type:INTEGER.UNSIGNED,
        primaryKey:true,
        autoIncrement:true
    },
    url:{
        type:STRING,
        allowNull:false,
    },
    monumentId:{
        type:INTEGER.UNSIGNED,
    }

},{timestamps:false});


export default Image;