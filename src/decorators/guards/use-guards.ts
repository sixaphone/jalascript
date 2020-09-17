import { __guards__ } from '@utils/constants';

export const UseGuards = (...guards: Function[]): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void => {
  Reflect.defineMetadata(
    __guards__,
    [
      ...(Reflect.getMetadata(__guards__, target.constructor, propertyKey) ??
        []),
      ...guards
    ],
    target.constructor,
    propertyKey
  );
};
