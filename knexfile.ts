import dotenv from 'dotenv';

dotenv.config();

import { configuration } from './src/db';

module.exports = {
  development: configuration,
  staging: configuration,
  production: configuration,
  test: configuration,
};
