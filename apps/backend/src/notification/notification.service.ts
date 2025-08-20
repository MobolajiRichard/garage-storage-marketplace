import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async getMyNotifications(sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const session = await this.authService.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    return await this.prisma.notification.findMany({
      where: {
        userId: session.userId,
      },
    });
  }
}
