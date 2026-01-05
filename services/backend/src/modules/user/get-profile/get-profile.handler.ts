import { Injectable } from '@nestjs/common';
import { Result } from 'neverthrow';
import { GetUserProfileQuery } from './get-profile.query';
import { UserRepository } from '../shared/repositories/user.repository';

export interface UserProfileDto {
  id: string;
  email: string;
  fullName: string;
}

@Injectable()
export class GetUserProfileHandler {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    query: GetUserProfileQuery,
  ): Promise<Result<UserProfileDto, string>> {
    const userResult = await this.userRepository.findById(query.userId);

    return userResult.map((user) => ({
      id: user.getDetails.id,
      email: user.getDetails.email,
      fullName: user.getDetails.fullName,
    }));
  }
}
