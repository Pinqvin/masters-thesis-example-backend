import { Router } from 'express';
import * as DataController from './controller/data';
import { asyncMiddleware } from './util/common';

const router = Router();

router.get('/data/:id', asyncMiddleware(DataController.getDataById));

export default router;
