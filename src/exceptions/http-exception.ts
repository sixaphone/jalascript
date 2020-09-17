import { Errors } from '@types';

export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly errors?: Errors;

  constructor(
    message: string,
    name: string,
    statusCode: number,
    errors?: Errors
  ) {
    super();
    this.message = message;
    this.errors = errors;
    this.name = name;
    this.statusCode = statusCode;
  }
}
