import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // Note: false를 리턴할경우 403을 응답한다.
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const jwtString = request.headers.authorization.split('Bearer ')[1];

    this.authService.verify(jwtString);

    return true;
  }
}
