import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Patch = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.PATCH,
    path,
    method: propertyKey as string
  });
