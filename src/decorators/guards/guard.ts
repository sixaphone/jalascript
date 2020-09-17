import { Request } from 'express';

export interface Guard {
  can(request: Request): boolean | Promise<boolean>;
}
