import Sequelize from 'sequelize';

import { SEQUELIZE } from '../util/database.js';

export class CartItem extends Sequelize.Model {}

CartItem.init(
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		quantity: Sequelize.INTEGER
	},
	{ sequelize: SEQUELIZE, modelName: 'cartItem' }
);
