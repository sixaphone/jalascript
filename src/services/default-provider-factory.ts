import { Provider } from '@types';
import { Container } from '../di/container';
import { Resolver } from '../di/resolver';
import { ProviderFactory, ProviderMap } from './provider-factory';
import { Injectable } from '@decorators/injectable';

@Injectable()
export class DefaultProviderFactory implements ProviderFactory {
  private readonly resolver: Resolver = new Resolver();

  public async createProviders(providers: Provider[]): Promise<ProviderMap> {
    const knownProviders: [
      symbol,
      any
    ][] = providers.map((provider: Provider) => [
      this.resolveKey(provider),
      this.resolveReference(provider)
    ]);

    const container: Container = new Container(...knownProviders);

    const resolvedProviders: [symbol, any][] = await Promise.all(
      [...container].map(async ([key, provider]: [symbol, Provider]) => [
        key,
        await this.resolver.resolve(provider, container)
      ]) as [symbol, any]
    );

    return { container, providers: resolvedProviders };
  }

  private resolveKey(provider: Provider): symbol {
    return this.isFunction(provider)
      ? Symbol.for(provider.name)
      : provider.provide;
  }

  private isFunction(provider: Provider): boolean {
    return typeof provider === 'function';
  }

  private resolveReference(provider: Provider): any {
    if (this.isFunction(provider)) {
      return provider;
    }

    if (provider.useClass) {
      return provider.useClass;
    }
  }
}
