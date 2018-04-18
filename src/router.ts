import { Router } from 'express';
import * as DataController from './controller/data';
import { asyncMiddleware } from './util/common';

const router = Router();

router.get('/data/:id', asyncMiddleware(DataController.getDataById));
router.get('/data-cpu/:id', asyncMiddleware(DataController.getDataByIdCpu));

export default router;
