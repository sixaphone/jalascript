import { Response } from 'express';

export interface ResponseHandler {
  handleResponse(response: Response, content: any): any;
}

export const ResponseHandler: symbol = Symbol.for('ResponseHandler');
