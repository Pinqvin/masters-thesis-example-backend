import express, { Request, Response, NextFunction } from 'express';
import compression from 'compression';
import errorhandler from 'errorhandler';
import bodyParser from 'body-parser';
import logger from './util/logger';

function handleErrors(err: any, _: Request, res: Response, next: NextFunction) {
  if (!res.headersSent && err.status) {
    res.status(err.status);

    if (err.expose) {
      logger.error(err.stack || err);

      return res.format({
        text: () => res.send(err.message),
        json: () => res.json({
          error: {
            message: err.message
          }
        }),
        default: () => res.type('text/plain').send(err.message)
      });
    }
  }

  return next(err);
}

function createApp() {
  const app = express();

  app.get('/health', (req, res) => {
    res.status(200).send('ok');
  });

  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(handleErrors);

  return app;
}

export default createApp;
