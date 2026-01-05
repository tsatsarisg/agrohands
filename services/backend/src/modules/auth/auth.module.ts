import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './shared/services/auth.service';
import { LoginHandler } from './login/login.handler';
import { SignupHandler } from './signup/signup.handler';
import { ChangePasswordHandler } from './change-password/change-password.handler';
import { UserModule } from '@modules/user';
import { CONFIG_TOKEN } from '../../config/config.factory';
import type { Config } from '../../config/config.schema';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      inject: [CONFIG_TOKEN],
      useFactory: (config: Config) => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LoginHandler, SignupHandler, ChangePasswordHandler],
  exports: [AuthService],
})
export class AuthModule {}
