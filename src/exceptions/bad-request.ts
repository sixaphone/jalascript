import { HttpException } from './http-exception';
import { HttpStatusName } from './http-status-name';
import { HttpStatus } from './http-status';
import { Errors } from '@types';

export class BadRequest extends HttpException {
  constructor(message: string, errors: Errors) {
    super(message, HttpStatusName.BAD_REQUEST, HttpStatus.BAD_REQUEST, errors);
  }
}
