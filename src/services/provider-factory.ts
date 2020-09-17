import { Container } from '@di/container';
import { Provider } from '@types';

export type ProviderMap = { container: Container; providers: Provider[] };

export interface ProviderFactory {
  createProviders(providers: Provider[]): Promise<ProviderMap>;
}

export const ProviderFactory: symbol = Symbol.for('ProviderFactory');
