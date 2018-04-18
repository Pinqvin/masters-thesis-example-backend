import winston from 'winston';
import { Logger } from 'winston';
import * as config from '../config';

const logger = new (Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.NODE_ENV === 'production' ? 'info' : 'debug',
      timestamp: true,
      colorize: config.NODE_ENV !== 'production'
    })
  ]
});

export default logger;
