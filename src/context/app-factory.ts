import { Provider } from '@types';
import { __controller__, __providers__ } from '@utils/constants';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Env } from '@utils/env';
import { Platform } from '@platform/platform';
import { ExpressPlatform } from '@platform/express-platform';
import { ExpressRouteBuilder } from '@services/express-route-builder';
import { RouteBuilder } from '@services/route-builder';
import { ResponseHandler } from '@services/response-handler';
import { DefaultProviderFactory } from '@services/default-provider-factory';
import { ExpressResponseHandler } from '@services/express-response-handler';
import { Injector } from '@di/injector';
import { ParamResolver } from '@di/param-resolver';
import { ValidationPipe } from '@decorators/pipes/validation-pipe';
import { ErrorHandler } from '@services/error-handler';
import { ExpressErrorHandler } from '@services/express-error-handler';

export interface App {}

export class AppFactory {
  private static overridableProviders: Provider[] = [
    { provide: RouteBuilder, useClass: ExpressRouteBuilder },
    { provide: ResponseHandler, useClass: ExpressResponseHandler },
    { provide: ErrorHandler, useClass: ExpressErrorHandler }
  ];

  private static internalProviders: Provider[] = [ValidationPipe];

  public static async createApp(
    context: App,
    adapter: 'express' = 'express'
  ): Promise<Platform> {
    const app: Platform = this.createPlatform(adapter);
    const controllers: any[] = Reflect.getMetadata(__controller__, context);
    const providers: any[] = Reflect.getMetadata(__providers__, context);

    const customProviderSymbols: symbol[] = providers
      .map((p) => p.provide)
      .filter((p) => p);

    const nonOverridenProviders: Provider[] = this.overridableProviders.filter(
      (op) => !customProviderSymbols.includes(op.provide)
    );

    await app.registerProviders([
      ...this.internalProviders,
      ...nonOverridenProviders,
      ...controllers,
      ...providers
    ]);
    await app.registerControllers(controllers);

    require('dotenv').config();
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(
      morgan(process.env.NODE_ENV === Env.PRODUCTION ? 'tiny' : 'combined')
    );

    return app;
  }

  private static createPlatform(adapter: 'express'): Platform {
    switch (adapter) {
      case 'express':
        return new ExpressPlatform(
          new Injector(),
          new DefaultProviderFactory(),
          new ParamResolver()
        );
      default:
        throw new Error('@platform not defined.');
    }
  }
}
