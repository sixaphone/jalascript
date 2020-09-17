import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';

export class Conflict extends HttpException {
  constructor(message: string) {
    super(message, HttpStatusName.CONFLICT, HttpStatus.CONFLICT);
  }
}
