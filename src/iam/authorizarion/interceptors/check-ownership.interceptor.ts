import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Inject,
  mixin,
  UnauthorizedException,
  NotImplementedException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST_USER_KEY } from '../../../iam/iam.constants';
import { Role } from '../../../users/enums/role.enum';

export function mixinCheckOwnership<T extends { id: number }>(
  entityClass: { new (...args: any[]): T },
  relationName: string = 'user',
) {
  @Injectable()
  class CheckOwnershipInterceptor implements NestInterceptor {
    constructor(
      @Inject(getRepositoryToken(entityClass))
      public readonly repo: Repository<T>,
    ) {}

    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest();
      const itemId = req.params.id;

      if (!req[REQUEST_USER_KEY]) {
        throw new NotImplementedException(
          'You Must Implement the Auth guard first',
        );
      }

      const extractedNumber = itemId.match(/^\d+$/)?.[0];
      const parsedId = extractedNumber ? parseInt(extractedNumber, 10) : NaN;

      if (isNaN(parsedId) || parsedId < 1) {
        throw new BadRequestException('Invalid ID: Must be a positive integer');
      }

      try {
        const item: any = await this.repo.findOne({
          where: { id: itemId },
          relations: [relationName],
        });

        if (
          item &&
          item[relationName] &&
          item[relationName].id !== req[REQUEST_USER_KEY].sub &&
          req[REQUEST_USER_KEY].role !== Role.Admin
        ) {
          throw new UnauthorizedException(
            'You are not the owner of this resource',
          );
        }

        return next.handle();
      } catch (error) {
        return throwError(() => error);
      }
    }
  }

  return mixin(CheckOwnershipInterceptor);
}
