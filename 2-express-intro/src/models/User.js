import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class User extends Sequelize.Model {}

User.init(
	{
		id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{ sequelize: SEQUELIZE, modelName: 'user' }
);
