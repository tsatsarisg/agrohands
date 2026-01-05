import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { err, ok, Result } from 'neverthrow';
import { LoginCommand } from './login.command';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '@modules/user';

@Injectable()
export class LoginHandler {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    command: LoginCommand,
  ): Promise<Result<{ token: string }, string>> {
    const userResult = await this.userService.findByEmail(command.email);
    if (userResult.isErr()) return err('Invalid credentials');

    const user = userResult.value;

    const passwordResult = this.authService.verifyPassword(
      command.password,
      user.getDetails.password,
    );

    if (passwordResult.isErr()) return err(passwordResult.error);

    const token = this.jwtService.sign({ userID: user.getDetails.id });

    return ok({ token });
  }
}
