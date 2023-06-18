import * as jwt from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import authConfig from '../config/authConfig';
import { ConfigType } from '@nestjs/config';

export interface UserLoginRequest {
  id: string;
  name: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
  ) {}

  login(userLoginRequest: UserLoginRequest) {
    const payload = { ...userLoginRequest };

    return jwt.sign(payload, this.config.jwtSecret, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com',
    });
  }
}
