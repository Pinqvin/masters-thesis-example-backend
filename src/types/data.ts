import joi from 'joi';

export const dataIdParameter = joi.number().integer().min(0).required();

export type DataId = number;

export interface Data {
  id: DataId;
  boolean: boolean;
  integer: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
