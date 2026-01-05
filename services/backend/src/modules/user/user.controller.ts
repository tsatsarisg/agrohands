import {
  Controller,
  Get,
  Put,
  Body,
  Request,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { GetUserProfileHandler } from './get-profile/get-profile.handler';
import { GetUserProfileQuery } from './get-profile/get-profile.query';
import { UpdateEmailHandler } from './update-email/update-email.handler';
import { UpdateEmailCommand } from './update-email/update-email.command';
import { updateEmailSchema } from './update-email/update-email.dto';
import type { UpdateEmailDto } from './update-email/update-email.dto';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(
    private readonly getProfileHandler: GetUserProfileHandler,
    private readonly updateEmailHandler: UpdateEmailHandler,
  ) {}

  @Get('profile')
  async getProfile(@Request() req: any) {
    const userId = req.user?.userID || 'temp-user-id';

    const query = new GetUserProfileQuery(userId);
    const result = await this.getProfileHandler.execute(query);

    if (result.isErr()) {
      throw new HttpException(result.error, HttpStatus.NOT_FOUND);
    }

    return result.value;
  }

  @Put('email')
  @UsePipes(new ZodValidationPipe(updateEmailSchema))
  async updateEmail(@Body() dto: UpdateEmailDto, @Request() req: any) {
    const userId = req.user?.userID || 'temp-user-id';

    const command = new UpdateEmailCommand(userId, dto.email);
    const result = await this.updateEmailHandler.execute(command);

    if (result.isErr()) {
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    return { message: 'Email updated successfully' };
  }
}
