import { Platform } from './platform';
import { ExpressRequestHandlerFactory } from './express-request-handler-factory';
import { Injector } from '@di/injector';
import { ProviderMap, ProviderFactory } from '@services/provider-factory';
import { RouteBuilder } from '@services/route-builder';
import { Provider, EndpointMap, EndpointHandler } from '@types';
import { Server } from 'http';
import express, { Application } from 'express';
import { RequestMethod } from '@decorators/request-method';
import { ParamResolver } from '@di/param-resolver';
import { ResponseHandler } from '@services/response-handler';
import { ErrorHandler } from '@services/error-handler';
import { Pipe } from '@decorators/pipes/pipe';

export class ExpressPlatform implements Platform {
  private readonly _app: Application = express();

  private _endpoints: EndpointMap = Object.values(RequestMethod).reduce(
    (endpoints: EndpointMap, method: RequestMethod) => {
      endpoints[method] = new Map();
      return endpoints;
    },
    {} as EndpointMap
  );

  private routeBuilder: RouteBuilder;

  private responseHandler: ResponseHandler;

  private errorHandler: ErrorHandler;

  constructor(
    private _injector: Injector,
    private readonly providerFactory: ProviderFactory,
    private readonly paramResolver: ParamResolver,
    private _pipes: Pipe[] = []
  ) {}

  public use(middleware: any): void {
    this._app.use(middleware);
  }

  public addGlobalPipes(...pipes: Pipe[]): void {
    this._pipes.push(...pipes);
  }

  public listen(port: number): Server {
    this._app.use(
      ExpressRequestHandlerFactory(
        this._endpoints,
        this.paramResolver,
        this.responseHandler,
        this.errorHandler,
        this._pipes
      )
    );
    return this._app.listen(port, () => {
      console.log(
        `[${new Date().toISOString()}][INFO] - Express app successfully started.`
      );
    });
  }

  public async registerProviders(
    unresolvedProviders: Provider[]
  ): Promise<void> {
    const {
      container,
      providers
    }: ProviderMap = await this.providerFactory.createProviders(
      unresolvedProviders
    );
    this._injector = new Injector(providers, container);
    this.setup();
  }

  public getInjector(): Readonly<Injector> {
    return this._injector;
  }

  public async registerControllers(controllers: any): Promise<void> {
    const endpointHandlers: EndpointHandler[] = await this.routeBuilder.buildEndpoints(
      controllers,
      this._injector
    );

    endpointHandlers.forEach((handler: EndpointHandler) =>
      this._endpoints[handler.requestMethod].set(handler.endpoint, handler)
    );
  }

  private setup(): void {
    this.routeBuilder = this._injector.get(RouteBuilder);
    this.responseHandler = this._injector.get(ResponseHandler);
    this.errorHandler = this._injector.get(ErrorHandler);
  }
}
