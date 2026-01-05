import { Injectable } from '@nestjs/common';
import { err, Result } from 'neverthrow';
import { UpdateEmailCommand } from './update-email.command';
import { UserRepository } from '../shared/repositories/user.repository';

@Injectable()
export class UpdateEmailHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: UpdateEmailCommand): Promise<Result<void, string>> {
    const userResult = await this.userRepository.findById(command.userId);

    if (userResult.isErr()) {
      return err(userResult.error);
    }

    const user = userResult.value;

    if (user.getDetails.email !== command.newEmail) {
      const emailExists = await this.userRepository.emailExists(command.newEmail);
      if (emailExists) {
        return err('Email already in use');
      }
    }

    const changeEmailResult = user.changeEmail(command.newEmail);
    if (changeEmailResult.isErr()) {
      return err(changeEmailResult.error);
    }

    return this.userRepository.updateEmail(user);
  }
}
