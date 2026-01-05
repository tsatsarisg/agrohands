import { Injectable } from '@nestjs/common';
import { err, ok, Result } from 'neverthrow';
import { ChangePasswordCommand } from './change-password.command';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '@modules/user';

@Injectable()
export class ChangePasswordHandler {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<Result<void, string>> {
    if (command.newPassword !== command.confirmNewPassword) {
      return err('New passwords do not match');
    }

    const userResult = await this.userService.findById(command.userId);
    if (userResult.isErr()) return err(userResult.error);

    const user = userResult.value;

    const passwordVerified = this.authService.verifyPassword(
      command.oldPassword,
      user.getDetails.password,
    );
    if (passwordVerified.isErr()) return passwordVerified;

    const updatedUserResult = this.authService.hashAndEncryptPassword(
      user,
      command.newPassword,
    );

    if (updatedUserResult.isErr()) return err(updatedUserResult.error);

    return this.userService.updatePassword(updatedUserResult.value);
  }
}
