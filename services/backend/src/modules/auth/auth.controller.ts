import {
  Controller,
  Post,
  Body,
  Request,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { loginSchema } from './login/login.dto';
import type { LoginDto } from './login/login.dto';
import { signupSchema } from './signup/signup.dto';
import type { SignupDto } from './signup/signup.dto';
import { changePasswordSchema } from './change-password/change-password.dto';
import type { ChangePasswordDto } from './change-password/change-password.dto';
import { LoginHandler } from './login/login.handler';
import { SignupHandler } from './signup/signup.handler';
import { ChangePasswordHandler } from './change-password/change-password.handler';
import { LoginCommand } from './login/login.command';
import { SignupCommand } from './signup/signup.command';
import { ChangePasswordCommand } from './change-password/change-password.command';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginHandler: LoginHandler,
    private readonly signupHandler: SignupHandler,
    private readonly changePasswordHandler: ChangePasswordHandler,
  ) {}

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() dto: LoginDto) {
    const command = new LoginCommand(dto.email, dto.password);
    const result = await this.loginHandler.execute(command);

    if (result.isErr()) {
      throw new HttpException(result.error, HttpStatus.UNAUTHORIZED);
    }

    return result.value;
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  async signup(@Body() dto: SignupDto) {
    const command = new SignupCommand(dto.name, dto.email, dto.password);
    const result = await this.signupHandler.execute(command);

    if (result.isErr()) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return result.value;
  }

  @Post('change-password')
  @UsePipes(new ZodValidationPipe(changePasswordSchema))
  async changePassword(@Body() dto: ChangePasswordDto, @Request() req: any) {
    const userId = req.user?.userID || 'temp-user-id';

    const command = new ChangePasswordCommand(
      userId,
      dto.oldPassword,
      dto.newPassword,
      dto.confirmNewPassword,
    );
    const result = await this.changePasswordHandler.execute(command);

    if (result.isErr()) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { message: 'Password changed successfully' };
  }
}
