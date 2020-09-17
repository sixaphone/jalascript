import { Response } from 'express';
import { ResponseHandler } from './response-handler';
import { Injectable } from '@decorators/injectable';

@Injectable()
export class ExpressResponseHandler implements ResponseHandler {
  public handleResponse(response: Response, content: any): any {
    switch (typeof content) {
      case 'string':
      case 'symbol':
      case 'number':
      case 'boolean':
      case 'bigint':
        response.set('Content-Type', 'text/plain');
        return response.send(content.toString());
      case 'object':
        response.set('Content-Type', 'application/json');
        return response.json(content);
      case 'undefined':
        response.set('Content-Type', 'text/plain');
        return response.end();
    }
  }
}
