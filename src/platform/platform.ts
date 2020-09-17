import { Provider } from '@types';
import { Injector } from '@di/injector';
import { Server } from 'http';
import { Pipe } from '@decorators/pipes/pipe';

export interface Platform {
  use(middleware: any): any;

  registerProviders(providers: Provider[]): Promise<void>;

  registerControllers(controllers: any): Promise<void>;

  addGlobalPipes(...pipes: Pipe[]): void;

  listen(port: number): Server;

  getInjector(): Readonly<Injector>;
}
