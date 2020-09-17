import 'reflect-metadata';
import { __prefix__ } from '../utils/constants';

export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(
      __prefix__,
      prefix.startsWith('/') ? prefix : `/${prefix}`,
      target
    );
  };
};
