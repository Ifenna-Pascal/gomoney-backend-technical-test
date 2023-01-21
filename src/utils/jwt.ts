import Jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
// import { BadTokenError } from '../core/ApiError';

async function signJwt(payload: string | Buffer | object) {
  return Jwt.sign(payload, JWT_SECRET);
}

function verifyJwt(token: string) {
  try {
    const decoded = Jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    // throw new BadTokenError(e);
    console.log(e);
  }
}

export { signJwt, verifyJwt };
