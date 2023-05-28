import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { AppController, ServiceA, ServiceB } from './app.controller';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UsersModule, EmailModule],
  controllers: [ApiController, AppController],
  providers: [ServiceA, ServiceB],
})
export class AppModule {}
