import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateProfileDto } from './users.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return this.userService.me(req['x-session-id']);
  }

  @Patch('me')
  @UseGuards(AuthGuard)
  async updateMe(@Body() dto: UpdateProfileDto, @Request() req) {
    return this.userService.updateProfile(req['x-session-id'], dto);
  }
}
