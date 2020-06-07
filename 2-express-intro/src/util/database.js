import mysql from 'mysql2';

export const CONNECTION_POOL = mysql
	.createPool({
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	})
	.promise();
