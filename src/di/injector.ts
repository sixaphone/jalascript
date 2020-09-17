import { Container } from './container';
import { Resolver } from './resolver';
import { Provider } from '@types';

export class Injector {
  private resolvedProviders: Map<symbol, any>;
  private _container: Container;
  private resolver: Resolver = new Resolver();

  get container(): Container {
    return this._container;
  }

  set container(container: Container) {
    if (!container) {
      throw new Error('Cannot use undefined as container.');
    }

    this._container = container;
  }

  constructor(
    providers: Provider[] = [],
    container: Container = new Container()
  ) {
    this._container = new Container(...container);
    this.resolvedProviders = new Map<symbol, any>(providers);
  }

  public get<T = any>(key: symbol | any): T {
    return this.resolvedProviders.get(this.resolveKey(key));
  }

  public resolve<T = any>(key: symbol | Provider): Promise<T> {
    return this.resolver.resolve(this.resolveKey(key), this._container);
  }

  private resolveKey(key: any): symbol | never {
    switch (typeof key) {
      case 'symbol':
        return key;
      case 'string':
      case 'bigint':
      case 'number':
        return Symbol.for(key.toString());
      case 'object':
      case 'function':
        return Symbol.for(key.name);
      case 'undefined':
      default:
        throw Error('Unable to resolve undefined.');
    }
  }
}
