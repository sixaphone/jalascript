import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Delete = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.DELETE,
    path,
    method: propertyKey as string
  });
