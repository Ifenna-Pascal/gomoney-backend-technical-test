import mongoose from 'mongoose';
import { DB_CONNECTION_STRING } from '../constants';
import logger from './logger';

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info('Connected to database');
  } catch (e) {
    logger.error(e, 'Failed to connect to database, Goodbye');
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();
  logger.info('Disconnected from database');
  return;
}
