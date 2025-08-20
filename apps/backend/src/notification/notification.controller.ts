import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  fetchMySpace(@Request() req) {
    return this.notificationService.getMyNotifications(req['x-session-id']);
  }
}
