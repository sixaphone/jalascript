import 'reflect-metadata';
import { __request__ } from '../../utils/constants';

export const Req = (): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    Reflect.defineMetadata(
      parameterIndex,
      {
        type: __request__
      },
      target.constructor,
      propertyKey
    );
  };
};
