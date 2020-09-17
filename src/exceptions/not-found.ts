import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';

export class NotFound extends HttpException {
  constructor(message: string) {
    super(message, HttpStatusName.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
