import { Router } from 'express';
import { sendResponse } from '../lib';

const router = Router();

router.get('/test', (req, res) => {
  return sendResponse(res, 200, true, 'Success' )
})


export default router;