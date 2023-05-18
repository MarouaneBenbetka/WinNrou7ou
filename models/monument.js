import {STRING, DOUBLE} from 'sequelize';


import db from "../utils/config/dbConnection";

const Monument = db.define('monument', {
    id:{
        type:STRING,
        primaryKey:true,
    },
    title:{
        type:STRING,
        allowNull:false,
    },
    summary:{
        type:STRING,
        allowNull:false
    },
    latitude:{
        type:DOUBLE,
        allowNull:false
    },
    longitude:{
        type:DOUBLE,
        allowNull:false
    }

});


export default Monument;