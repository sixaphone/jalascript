import { Injector } from '@di/injector';
import { EndpointHandler } from '@types';

export interface RouteBuilder {
  buildEndpoints(
    controllers: any[],
    injector: Injector
  ): Promise<EndpointHandler[]>;
}

export const RouteBuilder: symbol = Symbol.for('RouteBuilder');
