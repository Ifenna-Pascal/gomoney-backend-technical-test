import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CORS_ORIGIN, REDIS_PORT, REDIS_URL, SESSION_SECRET } from '../constants';
import deserializeUser from './deserialize_user';
import session from 'express-session';
import * as redis from 'redis';
import connectRedis from 'connect-redis'; 
// const RedisStore = connectRedis(session)
// let redisClient = redis.createClient(
//   {socket:
//     {
//       host: "redis",
//       port: 6379, 
//     },
//     legacyMode: true,
//   })

// redisClient.on('connect', ()=> {
//   console.log('connected')
// })

declare module 'express-session' {
  export interface SessionData {
    token: string;
  }
}

async function PreMiddleware(app: express.Application) {
  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.use(helmet());
  // app.use(session({
  //   store: new RedisStore({client: redisClient as any}),
  //   secret: "ifemoney",
  //   saveUninitialized: false,
  //   resave: false,
  //   cookie: {
  //     secure: false,
  //     sameSite: 'none',
  //     httpOnly: true,
  //     maxAge: 3000000000,
  //   }
  // }))
  app.use(deserializeUser);

  return app;
}

export default PreMiddleware;
