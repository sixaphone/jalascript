import 'reflect-metadata';
import { Provider } from '@types';
import { __controller__, __providers__ } from '@utils/constants';

export const AppContext = ({
  controllers,
  providers
}: {
  controllers?: any[];
  providers?: Provider[];
}): ClassDecorator => {
  return (target: any) => {
    Reflect.defineMetadata(__controller__, controllers ?? [], target);

    Reflect.defineMetadata(__providers__, providers ?? [], target);
  };
};
