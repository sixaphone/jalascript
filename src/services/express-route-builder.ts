import { RouteDefinition, EndpointHandler } from '@types';
import {
  __route__,
  __prefix__,
  __body__,
  __pipes__,
  __guards__
} from '@utils/constants';
import { join } from 'path';
import { RouteBuilder } from './route-builder';
import { Injector } from '@di/injector';
import { Injectable } from '@decorators/injectable';
import { Guard } from '@decorators/guards/guard';

type ControllerDefinition = {
  instance: any;
  prefix: string;
  routes: RouteDefinition[];
};

@Injectable()
export class ExpressRouteBuilder implements RouteBuilder {
  public async buildEndpoints(
    controllers: any[],
    injector: Injector
  ): Promise<EndpointHandler[]> {
    const controllerDefinitions: ControllerDefinition[] = controllers.map(
      (controller: any) => ({
        instance: injector.get(Symbol.for(controller.name)),
        prefix: Reflect.getMetadata(__prefix__, controller),
        routes: Reflect.getMetadata(__route__, controller)
      })
    );

    const endpoints: Promise<EndpointHandler[]>[] = controllerDefinitions.map(
      async (c: ControllerDefinition) => {
        return Promise.all(
          c.routes.map(async (r) => {
            const guards: Promise<Guard>[] = (
              Reflect.getMetadata(
                __guards__,
                c.instance.constructor,
                r.method
              ) ?? []
            ).map((g: Function) => injector.resolve(g));

            return {
              controller: c.instance,
              endpoint: join(c.prefix, r.path),
              requestMethod: r.requestMethod,
              method: r.method,
              pipes:
                Reflect.getMetadata(
                  __pipes__,
                  c.instance.constructor,
                  r.method
                ) ?? [],
              guards: await Promise.all(guards)
            };
          })
        );
      }
    );

    return (await Promise.all(endpoints)).flat();
  }
}
