import { Router, Request, Response } from 'express';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { adminRoute, authRoute, publicRoute, userRoute } from './route.import';

// initialize router
const router = Router();

router.get('/ping_pong', (req: Request, res: Response) => {
    logger.info('WELCOME TO TRANSXRIPT SERVER APPLICATION');
    res.status(StatusCodes.OK).json('WELCOME TO TRANSXRIPT SERVER APPLICATION');
});

router.use("/public", publicRoute.default)
router.use('/auth', authRoute.default)
router.use('/user', userRoute.default);
router.use('/admin', adminRoute.default)

export default router;