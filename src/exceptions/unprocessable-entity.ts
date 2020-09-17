import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';

export class UnprocessableEntity extends HttpException {
  constructor(message: string) {
    super(
      message,
      HttpStatusName.UNPROCESSABLE_ENTITY,
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  }
}
