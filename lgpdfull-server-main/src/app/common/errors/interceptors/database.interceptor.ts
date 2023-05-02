import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { isPrismaError } from '../utils/is-prisma-error.utils';
import { handleDatabaseErrors } from '../utils/random-database-error.utils';
import { DatabaseError } from '../types/DatabaseError';

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        catchError(error => {
            if(isPrismaError(error)){
                error = handleDatabaseErrors(error);
            }

            if(error instanceof DatabaseError){
                throw new BadRequestException(error.message);
            }
            else{
                throw error;
            }
        })
    )
  }
}
