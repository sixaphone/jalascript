import { registerEndpoint } from '../utils/register-endpoint';
import { RequestMethod } from './request-method';

export const Post = (path: string = '/'): MethodDecorator => (
  target,
  propertyKey: string | symbol
): void =>
  registerEndpoint(target, {
    requestMethod: RequestMethod.POST,
    path,
    method: propertyKey as string
  });
