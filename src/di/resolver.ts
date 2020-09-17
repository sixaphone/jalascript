import { Provider } from '@types';
import { Container } from './container';

export class Resolver {
  public async resolve(
    provider: Provider | symbol,
    container: Container
  ): Promise<any> {
    const registeredProvider: Provider =
      typeof provider === 'symbol' ? container.get(provider) : provider;

    const instance: any = this.resolveReference(registeredProvider);
    const params: any[] =
      Reflect.getMetadata('design:paramtypes', registeredProvider) ?? [];

    const args: any[] = await Promise.all(
      params.map((param: any, index: number) => {
        const token: symbol | undefined = Reflect.getMetadata(
          `${instance.name}:${index}`,
          instance
        );

        return this.resolveParam(
          token ? container.get(token) : param,
          container
        );
      })
    );

    return new instance(...args);
  }

  private resolveParam(parameter: any, container: Container): Promise<any> {
    return Reflect.hasMetadata('design:paramtypes', parameter)
      ? this.resolve(parameter, container)
      : Promise.resolve(new parameter().valueOf());
  }

  private resolveReference(provider: Provider): any {
    if (typeof provider === 'function') {
      return provider;
    }

    if (provider.useClass) {
      return provider.useClass;
    }
  }
}
