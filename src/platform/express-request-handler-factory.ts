import { Request, Response, NextFunction } from 'express';
import { RequestMethod } from '@decorators/request-method';
import { EndpointMap, EndpointHandler } from '@types';
import { NotFound } from '@exceptions/not-found';
import { ParamResolver } from '@di/param-resolver';
import { ResponseHandler } from '@services/response-handler';
import { ErrorResponse, ErrorHandler } from '@services/error-handler';
import { __params__ } from '@utils/constants';
import { ParamMetadata } from '@utils/register-parameter';
import { Pipe } from '@decorators/pipes/pipe';
import { Guard } from '@decorators/guards/guard';
import { Forbidden } from '@exceptions/forbidden';

export const ExpressRequestHandlerFactory = (
  endpoints: EndpointMap,
  paramResolver: ParamResolver,
  responseHandler: ResponseHandler,
  errorHandler: ErrorHandler,
  globalPipes: Pipe[]
) => {
  return async (request: Request, response: Response, _next: NextFunction) => {
    const path: string = request.path.replace(/\/$/, '') + '/';
    const requestMethod: RequestMethod = request.method.toLowerCase() as RequestMethod;

    try {
      const handler: EndpointHandler | undefined = endpoints[requestMethod].get(
        path
      );

      if (!handler) {
        throw new NotFound('Endpoint not found');
      }

      const { controller, method, pipes, guards } = handler;

      try {
        await Promise.all(
          guards.map(async (guard: Guard) => {
            const can: boolean = await Promise.resolve(guard.can(request));

            if (!can) {
              throw new Error('Failed on guard ' + guard.constructor.name);
            }
          })
        );
      } catch (e) {
        throw new Forbidden('User is not authorized for that action.');
      }

      const paramMetadata: ParamMetadata = Reflect.getMetadata(
        __params__,
        controller.constructor,
        method
      );

      await Promise.all(
        [...pipes, ...globalPipes].map(({ requestPipe, metadata }: Pipe) =>
          requestPipe.transfrom(request, {
            params: paramMetadata,
            custom: metadata
          })
        )
      );

      const args: any[] = paramResolver.resolve(
        controller,
        method,
        request,
        response
      );

      const content: any = await Promise.resolve(
        controller[method].call(controller, ...args)
      );

      return responseHandler.handleResponse(response, content);
    } catch (e) {
      const error: ErrorResponse = errorHandler.handleError(e);
      response.status(error.statusCode);
      response.json(error);
    }
  };
};
