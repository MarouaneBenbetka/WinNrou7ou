import { STRING,ENUM, INTEGER,TINYINT} from 'sequelize';


import db from "../utils/config/dbConnection";

const Type = db.define('type', {
    name:{
        type:STRING,
        primaryKey:true
    }
},{timestamps:false});


export default Type;