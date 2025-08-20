import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async myBookings(sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const session = await this.authService.getSession(sessionId);

    const spaces = await this.prisma.booking.findMany({
      where: {
        customerId: session?.userId,
      },
      include: {
        space: {
          include: {
            Address: true,
          },
        },
      },
    });

    return spaces;
  }

  async cancelBooking(id: string) {
    return await this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}
