import { RequestPipe } from './request-pipe';

export class Pipe {
  constructor(
    public readonly requestPipe: RequestPipe,
    readonly metadata?: { [key: string]: any }
  ) {}
}
