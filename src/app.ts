import express, { NextFunction, Request, Response } from 'express';
import { ApiError, ErrorType, InternalError, NotFoundError } from './core/ApiError';
import PreMiddleware from './middleware/premiddleware';
import routes from './routes/index';
import logger from './utils/logger';

process.on('uncaughtException', (e) => {
  logger.error(e);
});

// initialize app
const app = express();
// handling all premiddlewares
PreMiddleware(app);
// application route setup
app.use('/api/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
    if (err.type === ErrorType.INTERNAL)
      logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  } else {
    logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    logger.error(err);
    // if (environment === 'development') {
    //   return res.status(500).send(err);
    // }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
