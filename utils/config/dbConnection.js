import {Sequelize} from 'sequelize';

const db = new Sequelize(process.env.DB_URI, { logging: true });



export default db;