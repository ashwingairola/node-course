export const startServer = app => {
	const server = app.listen(process.env.SERVER_PORT);

	server.on('listening', () => {
		console.log(`Server now listening on port ${process.env.SERVER_PORT}`);
	});

	server.on('close', () => {
		console.log('Shutting down.');
	});

	return server;
};
