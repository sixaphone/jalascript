import { HttpException } from '@exceptions/http-exception';
import { ErrorResponse, ErrorHandler } from './error-handler';
import { HttpStatus } from '@exceptions/http-status';
import { HttpStatusName } from '@exceptions/http-status-name';

export class ExpressErrorHandler implements ErrorHandler {
  private knownErrors: number[] = [
    HttpStatus.NOT_FOUND,
    HttpStatus.UNAUTHORIZED,
    HttpStatus.BAD_REQUEST,
    HttpStatus.FORBIDDEN,
    HttpStatus.CONFLICT,
    HttpStatus.UNPROCESSABLE_ENTITY
  ];

  public handleError(exception: HttpException | Error): ErrorResponse {
    return exception instanceof HttpException &&
      this.knownErrors.includes(exception.statusCode)
      ? exception
      : {
          message: 'Internal Server Error.',
          name: HttpStatusName.INTERNAL_SERVER_ERROR,
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        };
  }
}
