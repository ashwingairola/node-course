import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class OrderItem extends Sequelize.Model {}

OrderItem.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		quantity: Sequelize.INTEGER
	},
	{ sequelize: SEQUELIZE, modelName: 'orderItem' }
);
