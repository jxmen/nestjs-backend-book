import { Controller, Get, Inject, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';

@Injectable()
export class ServiceA {
  getHello(): string {
    return '';
  }
}

class BaseService {
  constructor(@Inject(ServiceA) private readonly serviceA: ServiceA) {}
  protected doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}

@Injectable()
export class ServiceB extends BaseService {
  // BaseService에서 serviceA를 주입받으므로 super를 호출하지 않아도 된다.
  // constructor(serviceA: ServiceA) {
  //   super(serviceA);
  // }

  getHello(): string {
    return this.doSomeFuncFromA();
  }
}

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(
    private readonly serviceB: ServiceB,
    private readonly configService: ConfigService,
  ) {}

  @Get('/db-host-from-config')
  getDatabaseHostFromConfigService(): string {
    return this.configService.get('DATABASE_HOST');
  }

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }

  @Get('/error')
  error(): void {
    throw new Error('일부러 예외 발생');
  }
}
