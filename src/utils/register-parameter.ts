import { __route__, __prefix__, __params__ } from './constants';

export interface ParamMetadata {
  position: symbol;
  type?: any;
  name?: string;
}

export type MethodParameters = {
  readonly [key: string]: ParamMetadata;
};

export const registerParameter = (
  target: any,
  propertyKey: string | symbol,
  parameterIndex: number,
  metadata: {
    position: symbol;
    name?: string;
  }
): void => {
  const type: any = Reflect.getMetadata(
    'design:paramtypes',
    target,
    propertyKey
  )[parameterIndex];

  Reflect.defineMetadata(
    parameterIndex,
    metadata,
    target.constructor,
    propertyKey
  );

  const parameters: MethodParameters =
    Reflect.getMetadata(__params__, target.constructor, propertyKey) ?? {};

  Reflect.defineMetadata(
    __params__,
    {
      ...parameters,
      [parameterIndex]: {
        position: metadata.position,
        type,
        name: metadata.name
      }
    },
    target.constructor,
    propertyKey
  );
};
