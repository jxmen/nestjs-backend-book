import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { AppController, ServiceA, ServiceB } from './app.controller';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    /**
     * Note: ConfigModule은 Dynamic Module을 반환한다.
     */
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.production.env'
          : process.env.NODE_ENV === 'stage'
          ? '.stage.env'
          : '.development.env',
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [ServiceA, ServiceB],
})
export class AppModule {}
