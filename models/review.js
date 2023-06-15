import { INTEGER, STRING, TEXT } from "sequelize";

import db from "../utils/config/dbConnection";

const Review = db.define(
	"review",
	{
		id: {
			type: INTEGER.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
		},
		comment: {
			type: TEXT,
			allowNull: false,
		},
		monumentId: {
			type: INTEGER,
			unique: false,
		},
		userId: {
			type: STRING,
			unique: false,
		},
	},
	{ createdAt: true, updatedAt: false }
);

export default Review;
