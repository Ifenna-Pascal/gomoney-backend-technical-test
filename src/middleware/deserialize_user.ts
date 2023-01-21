import { Response, Request, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';


function deserializeUser(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.session);
    // const accessToken = req.session?.token;
    const accessToken = req.headers.authorization?.split(' ')[1] || '';
    
    if (!accessToken) return next();

    const decoded = verifyJwt(accessToken);
    if (decoded) {
      res.locals.user = decoded;
    }

    return next();
  } catch (err) {
    console.log(err);
  }
}

export default deserializeUser;
