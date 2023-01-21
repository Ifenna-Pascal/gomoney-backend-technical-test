import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'new';
export const APP_NAME = process.env.APP_NAME || '';
export const NO_REPLY = process.env.NO_REPLY || '';
export const PASSWORD = process.env.PASSWORD || '';
export const REDIS_URL = process.env.REDIS_URL || 'redis';
export const REDIS_PORT = process.env.REDIS_PORT || 6379
export const SESSION_SECRET = process.env.SESSION_SECRET 