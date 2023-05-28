import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ApiController } from './api/api.controller';
import { AppController, ServiceA, ServiceB } from './app.controller';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import emailConfig from './config/emailConfig';

import * as Joi from 'joi';

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
  ],
  controllers: [ApiController, AppController],
  providers: [ServiceA, ServiceB],
})
export class AppModule {}
