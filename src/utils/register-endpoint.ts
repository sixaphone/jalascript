import { RouteDefinition } from '@types';
import { __route__, __prefix__ } from './constants';

export const registerEndpoint = (target: any, route: RouteDefinition): void => {
  Reflect.defineMetadata(
    __route__,
    [...(Reflect.getMetadata(__route__, target.constructor) ?? []), route],
    target.constructor
  );
};
