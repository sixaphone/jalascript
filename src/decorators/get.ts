import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Get = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.GET,
    path,
    method: propertyKey as string
  });
