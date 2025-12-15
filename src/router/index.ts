import { Router } from 'express';
import { sendResponse } from '../lib';
import { internalController, userLocationController } from '../controllers';
import { verifyToken } from '../middlewares';

const router = Router();

router.use('/user-info', verifyToken, userLocationController);

router.use('/internal', internalController)

router.get('/test', (req, res) => {
  return sendResponse(res, 200, true, 'Success' )
})


export default router;