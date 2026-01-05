import { Injectable } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import { SignupCommand } from './signup.command';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '@modules/user';

@Injectable()
export class SignupHandler {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(
    command: SignupCommand,
  ): Promise<Result<{ id: string }, string>> {
    // Check if user already exists
    const emailExists = await this.userService.emailExists(command.email);
    if (emailExists) return err('User already exists');

    // Create user with hashed password
    const userResult = this.authService.createUserWithPassword(
      command.email,
      command.password,
      command.name,
    );

    if (userResult.isErr()) return err(userResult.error);

    // Save user
    const saveResult = await this.userService.create(userResult.value);
    if (saveResult.isErr()) return err(saveResult.error);

    return ok({ id: saveResult.value.id });
  }
}
