import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ExcludePasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof Array) {
          return data.map((item) => this.excludePassword(item));
        } else {
          return this.excludePassword(data);
        }
      }),
    );
  }

  private excludePassword(data: any): any {
    if (typeof data === 'object' && data !== null) {
      if (Array.isArray(data)) {
        // Handle arrays recursively
        return data.map((item) => this.excludePassword(item));
      } else if (!(data instanceof Date)) {
        // Handle objects recursively
        const newData = { ...data };
        for (const key in newData) {
          if (key === 'password') {
            delete newData[key];
          } else {
            newData[key] = this.excludePassword(newData[key]);
          }
        }
        return newData;
      }
    }
    return data;
  }
}
