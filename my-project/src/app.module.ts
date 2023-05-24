import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { AppController, ServiceA, ServiceB } from './app.controller';

@Module({
  imports: [UsersModule],
  controllers: [ApiController, AppController],
  providers: [ServiceA, ServiceB],
})
export class AppModule {}
