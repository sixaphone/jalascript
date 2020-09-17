import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Put = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.PUT,
    path,
    method: propertyKey as string
  });
