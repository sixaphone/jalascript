import { __pipes__ } from '@utils/constants';
import { Pipe } from './pipe';

export const UsePipes = (...pipes: Pipe[]): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void => {
  const registeredPipes: Pipe[] =
    Reflect.getMetadata(__pipes__, target.constructor, propertyKey) ?? [];

  Reflect.defineMetadata(
    __pipes__,
    [...registeredPipes, ...pipes],
    target.constructor,
    propertyKey
  );
};
