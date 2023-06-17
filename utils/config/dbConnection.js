import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
const db = new Sequelize(process.env.DB_URI, {
	logging: true,
	dialectModule: mysql2,
});

export default db;
