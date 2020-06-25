import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class Order extends Sequelize.Model {}

Order.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		}
	},
	{ sequelize: SEQUELIZE, modelName: 'order' }
);
