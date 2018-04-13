import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import dotenv from 'dotenv';
import { Server } from 'http';
import createApp from './app';

// Load environment variables from .env file
dotenv.config();

import logger from './util/logger';
import connect from './db';
import { PORT } from './config';

function closeServer(server: Server) {
  logger.info('Stopping incoming connections');
  server.close(() => {
    logger.info('Server has stopped listening to incoming connections');
    logger.info('Closing database connection');
    connect().destroy();
  });
}

if (require.main === module) {
  logger.info('Starting server...');

  const app = createApp();
  const server = app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`);
  });

  process.on('SIGINT', () => closeServer(server));
  process.on('SIGTERM', () => closeServer(server));
}
