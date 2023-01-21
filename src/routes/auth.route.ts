import { Router} from 'express';
import { loginUser, registerUser, userProfile } from '../controller/auth/auth.controller';
import { loginSchema, registerUserSchema } from '../validation/auth.schema';
import { processRequestBody } from 'zod-express-middleware';
import isAuth from '../middleware/isAuth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', [processRequestBody(loginSchema.body)], loginUser);
router.get('/profile', isAuth, userProfile);

export default router;