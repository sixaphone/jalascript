export class Container implements ReadonlyMap<symbol, any> {
  public readonly map: ReadonlyMap<symbol, any>;
  public readonly size: number;

  constructor(...values: [symbol, any][]) {
    this.map = new Map<symbol, any>(values);
  }

  public forEach(
    callbackfn: (
      value: any,
      key: symbol,
      map: ReadonlyMap<symbol, any>
    ) => void,
    thisArg?: any
  ): void {
    this.map.forEach(callbackfn, thisArg);
  }

  public get(key: symbol) {
    return this.map.get(key);
  }

  public has(key: symbol): boolean {
    return this.map.has(key);
  }

  [Symbol.iterator](): IterableIterator<[symbol, any]> {
    return this.entries();
  }

  public entries(): IterableIterator<[symbol, any]> {
    return this.map.entries();
  }

  public keys(): IterableIterator<symbol> {
    return this.map.keys();
  }

  public values(): IterableIterator<any> {
    return this.map.values();
  }
}
