import { Router } from 'express';
import { sendResponse } from '../lib';
import { internalController } from '../controllers';

const router = Router();

router.use('/internal', internalController)

router.get('/test', (req, res) => {
  return sendResponse(res, 200, true, 'Success' )
})


export default router;