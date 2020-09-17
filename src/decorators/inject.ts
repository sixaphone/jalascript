export const Inject = (reference: symbol | Function) => {
  return (target: any, _propertyKey: string, parameterIndex: number): any => {
    return Reflect.defineMetadata(
      `${target.name}:${parameterIndex}`,
      reference,
      target
    );
  };
};
