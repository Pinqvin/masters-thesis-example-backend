export const NODE_ENV = process.env.NODE_ENV || 'development';

export const PORT = parseInt(process.env.PORT, 10) || 3000;

export const DATABASE_URL = process.env.DATABASE_URL;

export const WEB_CONCURRENCY = parseInt(process.env.WEB_CONCURRENCY, 10) || 1;
