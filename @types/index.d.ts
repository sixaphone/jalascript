import { RequestMethod } from '@decorators/request-method';
import { RequestPipe } from '@decorators/pipes/request-pipe';
import { RequestMethod } from '@decorators/request-method';
import { EndpointHandler } from 'src/services/route-builder';
import { ParamMetadata } from 'src/utils/register-parameter';
import { Guard } from '@decorators/guards/guard';

export declare module '@types' {
  export type RouteDefinition = {
    path: string;
    method: string;
    requestMethod: RequestMethod;
  };

  export type EndpointDefinition = RouteDefinition & {
    controller: Function;
  };

  export type EndpointHandler = {
    endpoint: string;
    controller: any;
    method: string;
    pipes?: Pipe[];
    guards?: Guard[];
    requestMethod: RequestMethod;
  };

  export type Provider = { provide: symbol; useClass: any } | function;

  export type ErrorBag = { [propery: string]: string[] };

  export type EndpointMap = {
    [method in RequestMethod]: Map<string, EndpointHandler>;
  };

  export type Errors = { [key: string]: string | string[] };

  export type PipeMetadata = {
    params: ParamMetadata;
    custom?: { [key: string]: any };
  };
}
