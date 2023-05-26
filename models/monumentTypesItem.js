import { STRING,ENUM, INTEGER,TINYINT} from 'sequelize';


import db from "../utils/config/dbConnection";

const MonumentTypesItem = db.define('monument_types_item', {
    type:{
        type:STRING,
        primaryKey:true
    },
    monument_id:{
        type:STRING,
        primaryKey:true,
    }
},{freezeTableName:true,timestamps:false});


export default MonumentTypesItem;