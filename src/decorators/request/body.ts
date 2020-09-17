import 'reflect-metadata';
import { __body__ } from '../../utils/constants';
import { registerParameter } from '@utils/register-parameter';

export const Body = (name?: string): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    registerParameter(target, propertyKey, parameterIndex, {
      position: __body__,
      name
    });
  };
};
