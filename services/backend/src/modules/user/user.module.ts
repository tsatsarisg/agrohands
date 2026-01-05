import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserRepository, USER_MODEL_TOKEN } from './shared/repositories/user.repository';
import { UserSchema } from './shared/repositories/user.schema';
import { UserService } from './shared/services/user.service';
import { GetUserProfileHandler } from './get-profile/get-profile.handler';
import { UpdateEmailHandler } from './update-email/update-email.handler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL_TOKEN, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [
    UserRepository,
    UserService,
    GetUserProfileHandler,
    UpdateEmailHandler,
  ],
  exports: [UserService],
})
export class UserModule {}
