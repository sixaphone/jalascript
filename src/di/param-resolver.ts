import { Request, Response } from 'express';
import {
  __query__,
  __path__,
  __body__,
  __request__,
  __response__
} from '@utils/constants';

type Options = { position: symbol; name: string };

export class ParamResolver {
  public resolve(
    target: any,
    method: string,
    request: Request,
    response: Response
  ): any[] {
    return Array.from(
      { length: target[method]?.length ?? 0 },
      (_: any, index: number) => {
        const options: Options = Reflect.getMetadata(
          index,
          target.constructor,
          method
        );

        return this.resolveValue(options, request, response);
      }
    );
  }

  private resolveValue(
    { name, position }: Options,
    request: Request,
    response: Response
  ): any {
    switch (position) {
      case __query__:
        return name ? request.query[name] : request.query;
      case __path__:
        return name ? request.params[name] : request.params;
      case __body__:
        return name ? request.body[name] : request.body;
      case __request__:
        return request;
      case __response__:
        return response;
    }
  }
}
