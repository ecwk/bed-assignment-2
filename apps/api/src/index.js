const { startServer } = require('./server');

const bootstrap = async () => {
  const server = await startServer();
};

bootstrap();
