import Sequelize from 'sequelize';

export const SEQUELIZE = new Sequelize.Sequelize({
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	dialect: 'mysql'
});
