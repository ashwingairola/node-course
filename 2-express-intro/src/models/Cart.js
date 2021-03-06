import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class Cart extends Sequelize.Model {}

Cart.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		}
	},
	{ sequelize: SEQUELIZE, modelName: 'cart' }
);
