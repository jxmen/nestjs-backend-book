import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { AppController, ServiceA, ServiceB } from './app.controller';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';

import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger.middleware';
import { Logger2Middleware } from './logger2.middleware';
import { UsersController } from './users/users.controller';

const validationSchema = Joi.object({
  EMAIL_SERVICE: Joi.string().required(),
  EMAIL_AUTH_USER: Joi.string().required(),
  EMAIL_AUTH_PASSWORD: Joi.string().required(),
  EMAIL_BASE_URL: Joi.string().required().uri(),
});

@Module({
  imports: [
    UsersModule,
    EmailModule,
    /**
     * Note: ConfigModule은 Dynamic Module을 반환한다.
     */
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3309,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'test',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHORONIZE === 'true', // 소스 기반으로 데이터베이스 스키마 동기화. 운영에서는 비사용 권장!!!
    }),
  ],
  controllers: [ApiController, AppController],
  providers: [ServiceA, ServiceB],
})
// 미들웨어를 모듈에 포함하기 위해서는 NestModule 인터에피스를 구현해야 한다.
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware, Logger2Middleware)
      .exclude({
        path: '/users',
        method: RequestMethod.GET,
      })
      .forRoutes(UsersController);
  }
}
