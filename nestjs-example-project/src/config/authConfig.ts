import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  jwtSecret: 'my_jwt_secret_key',
}));
