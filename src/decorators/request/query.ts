import 'reflect-metadata';
import { __query__ } from '../../utils/constants';
import { registerParameter } from '@utils/register-parameter';

export const Query = (name: string): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    registerParameter(target, propertyKey, parameterIndex, {
      position: __query__,
      name
    });
  };
};
