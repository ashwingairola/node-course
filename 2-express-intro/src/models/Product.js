import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class Product extends Sequelize.Model {}

Product.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		price: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		imageUrl: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
			type: Sequelize.TEXT,
			allowNull: false
		}
	},
	{ sequelize: SEQUELIZE, modelName: 'product' }
);
