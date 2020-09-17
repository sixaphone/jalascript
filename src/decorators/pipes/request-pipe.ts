import { Request } from 'express';
import { PipeMetadata } from '@types';

export interface RequestPipe {
  transfrom(request: Request, metadata?: PipeMetadata): Promise<void>;
}
