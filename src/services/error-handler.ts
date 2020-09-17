import { HttpException } from '@exceptions/http-exception';
import { Errors } from '@types';

export interface ErrorResponse {
  statusCode: number;
  message: string;
  name: string;
  errors?: Errors;
}

export interface ErrorHandler {
  handleError(exception: HttpException | Error): ErrorResponse;
}

export const ErrorHandler: symbol = Symbol.for('ErrorHandler');
