import { Request } from 'express';
import { RequestPipe } from './request-pipe';
import { Injectable } from '@decorators/injectable';
import { ParamMetadata } from '../../utils/register-parameter';
import { __query__, __path__, __body__ } from '@utils/constants';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ErrorBag, PipeMetadata } from '@types';
import { BadRequest } from '../../exceptions/bad-request';

@Injectable()
export class ValidationPipe implements RequestPipe {
  public async transfrom(
    request: Request,
    metadata: PipeMetadata
  ): Promise<void> {
    const { params } = metadata;
    const validations: Promise<void>[] = Object.entries(params ?? {}).map(
      async ([, paramMetadata]: [string, ParamMetadata]) => {
        const { type } = paramMetadata;
        if (type) {
          const value: any = this.getValue(request, paramMetadata);
          const instance = plainToClass(type, value);

          const errors: ValidationError[] = await validate(instance, {
            validationError: { target: false }
          });

          if (errors.length) {
            throw new BadRequest('Invalid payload', this.parseErrors(errors));
          }
        }
      }
    );

    await Promise.all(validations);
  }

  private parseErrors(errors: ValidationError[]): ErrorBag {
    return errors.reduce((errorBag: ErrorBag, error: ValidationError) => {
      if (error.constraints) {
        errorBag[error.property] = Object.values(error.constraints);
      }

      if (error.children.length) {
        errorBag = {
          ...errorBag,
          ...Object.entries(this.parseErrors(error.children)).reduce(
            (acc: ErrorBag, [property, constraints]: [string, string[]]) => {
              acc[property] = constraints;

              return acc;
            },
            {}
          )
        };
      }

      return errorBag;
    }, {});
  }

  private getValue(request: Request, paramMetadata: ParamMetadata): any {
    const { name, position } = paramMetadata;
    switch (position) {
      case __query__:
        return name ? request.query[name] : request.query;
      case __path__:
        return name ? request.params[name] : request.params;
      case __body__:
        return name ? request.body[name] : request.body;
    }
  }
}
