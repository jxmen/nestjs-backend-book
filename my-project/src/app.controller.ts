import { Controller, Get, Inject, Injectable } from '@nestjs/common';

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
  getHello(): string {
    return this.doSomeFuncFromA();
  }
}

@Controller()
export class AppController {
  constructor(private readonly serviceB: ServiceB) {}

  @Get('/serviceB')
  getHelloC(): string {
    return this.serviceB.getHello();
  }
}
