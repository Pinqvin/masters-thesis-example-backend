import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import dotenv from 'dotenv';
dotenv.config();
import { Server } from 'http';
import throng from 'throng';
import createApp from './app';

import logger from './util/logger';
import connect from './db';
import { PORT, WEB_CONCURRENCY } from './config';

function closeServer(server: Server) {
  logger.info('Stopping incoming connections');
  server.close(() => {
    logger.info('Server has stopped listening to incoming connections');
    logger.info('Closing database connection');
    connect().destroy();
  });
}

function startServer(id: number) {
  logger.info('Starting server...');

  const app = createApp();
  const server = app.listen(PORT, () => {
    logger.info(`Server worker ${id} listening on port ${PORT}`);
  });

  process.on('SIGINT', () => closeServer(server));
  process.on('SIGTERM', () => closeServer(server));
}

if (require.main === module) {
  throng({
    workers: WEB_CONCURRENCY,
    start: startServer,
  });
}
