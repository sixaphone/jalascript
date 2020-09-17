import { RequestPipe } from './request-pipe';
import { Request } from 'express';
import { Injectable } from '@decorators/injectable';
import { __query__, __path__, __body__ } from '@utils/constants';
import { PipeMetadata } from '@types';

@Injectable()
export class DefaultValuePipe implements RequestPipe {
  public async transfrom(
    request: Request,
    metadata: PipeMetadata
  ): Promise<void> {
    Object.entries(
      metadata.custom ?? {}
    ).forEach(([position, defaults]: [string, any]): void =>
      this.applyDefaults(position, defaults, request)
    );
  }

  private applyDefaults(position: string, defaults: any, req: Request): void {
    switch (position) {
      case 'body':
        return (req.body = { ...defaults, ...req.body });
      case 'params':
        return (req.params = { ...defaults, ...req.params });
      case 'query':
        return (req.query = { ...defaults, ...req.query });
    }
  }
}
