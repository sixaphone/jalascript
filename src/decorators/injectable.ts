import 'reflect-metadata';
import { __prefix__ } from '../utils/constants';

export const Injectable = (): ClassDecorator => {
  return (target: any) => target;
};
