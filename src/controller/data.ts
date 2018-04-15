import { Request, Response } from 'express';
import joi from 'joi';
import * as DataCore from '../core/data';
import { DataId, dataIdParameter } from '../types/data';
import { validateParameters } from '../util/common';


export async function getDataById(req: Request, res: Response) {
  const id = validateParameters<DataId>(req.params.id, dataIdParameter);

  const result = await DataCore.getDataById(id);

  if (result === undefined) {
    return res.sendStatus(404);
  }

  return res.json(result);
}
