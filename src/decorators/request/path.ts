import 'reflect-metadata';
import { __path__ } from '../../utils/constants';
import { registerParameter } from '@utils/register-parameter';

export const Path = (name: string): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    registerParameter(target, propertyKey, parameterIndex, {
      position: __path__,
      name
    });
  };
};
