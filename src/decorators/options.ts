import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Options = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.OPTIONS,
    path,
    method: propertyKey as string
  });
