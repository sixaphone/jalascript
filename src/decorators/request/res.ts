import 'reflect-metadata';
import { __response__ } from '../../utils/constants';

export const Res = (): ParameterDecorator => {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    Reflect.defineMetadata(
      parameterIndex,
      {
        type: __response__
      },
      target.constructor,
      propertyKey
    );
  };
};
