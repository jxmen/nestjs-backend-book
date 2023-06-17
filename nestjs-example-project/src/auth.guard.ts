import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Note: false를 리턴할경우 403을 응답한다.
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    return true;
  }
}
