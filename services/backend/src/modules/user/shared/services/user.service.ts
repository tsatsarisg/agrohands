import { Injectable } from '@nestjs/common';
import { Result } from 'neverthrow';
import { User } from '../domain/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByEmail(email: string): Promise<Result<User, string>> {
    return this.userRepository.findByEmail(email);
  }

  async findById(id: string): Promise<Result<User, string>> {
    return this.userRepository.findById(id);
  }

  async create(user: User): Promise<Result<{ id: string }, string>> {
    return this.userRepository.create(user);
  }

  async updatePassword(user: User): Promise<Result<void, string>> {
    return this.userRepository.updatePassword(user);
  }

  async updateEmail(user: User): Promise<Result<void, string>> {
    return this.userRepository.updateEmail(user);
  }

  async emailExists(email: string): Promise<boolean> {
    return this.userRepository.emailExists(email);
  }
}
