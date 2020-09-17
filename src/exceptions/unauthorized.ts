import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';

export class Unauthrozrized extends HttpException {
  constructor(message: string) {
    super(message, HttpStatusName.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
  }
}
