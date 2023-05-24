import { STRING} from 'sequelize';


import db from "../utils/config/dbConnection";

const Wilaya = db.define('wilayas', {
    name:{
        type:STRING,
        primaryKey:true
    }
},{freezeTableName:true,timestamps:false});


export default Wilaya;