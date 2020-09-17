import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';

export class InternalServerError extends HttpException {
  constructor(message: string) {
    super(
      message,
      HttpStatusName.INTERNAL_SERVER_ERROR,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}
