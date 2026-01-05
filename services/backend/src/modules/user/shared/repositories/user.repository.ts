import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { err, ok, Result } from 'neverthrow';
import { User } from '../domain/user.entity';
import { UserDocument } from './user.schema';

export const USER_MODEL_TOKEN = UserDocument.name;

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async findByEmail(email: string): Promise<Result<User, string>> {
    const userDoc = await this.userModel.findOne({ email }).exec();

    if (!userDoc) return err('User not found');

    return User.create({
      id: userDoc._id.toString(),
      fullName: userDoc.fullName,
      email: userDoc.email,
      password: userDoc.password,
    });
  }

  async findById(id: string): Promise<Result<User, string>> {
    const userDoc = await this.userModel
      .findOne({ _id: new Types.ObjectId(id) })
      .exec();

    if (!userDoc) return err('User not found');

    return User.create({
      id: userDoc._id.toString(),
      fullName: userDoc.fullName,
      email: userDoc.email,
      password: userDoc.password,
    });
  }

  async create(user: User): Promise<Result<{ id: string }, string>> {
    const result = await this.userModel.create({
      fullName: user.getDetails.fullName,
      email: user.getDetails.email,
      password: user.getDetails.password,
    });

    if (!result) return err('Error creating user');

    return ok({ id: result._id.toString() });
  }

  async updatePassword(user: User): Promise<Result<void, string>> {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(user.getDetails.id) },
      { $set: { password: user.getDetails.password } },
    );
    return ok(undefined);
  }

  async updateEmail(user: User): Promise<Result<void, string>> {
    await this.userModel.updateOne(
      { _id: new Types.ObjectId(user.getDetails.id) },
      { $set: { email: user.getDetails.email } },
    );
    return ok(undefined);
  }

  async emailExists(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email }).exec();
    return count > 0;
  }
}
