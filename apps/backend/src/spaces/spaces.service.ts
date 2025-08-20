import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBookingDto,
  CreateSpaceDto,
  CreateSpaceReviewDto,
} from './spaces.dto';

@Injectable()
export class SpacesService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createSpace(data: CreateSpaceDto) {
    const { address, ...rest } = data;

    //create space
    const space = await this.prisma.space.create({
      data: {
        ...rest,
      },
    });

    //create address with spaceId
    await this.prisma.address.create({
      data: {
        spaceId: space.id,
        ...address,
      },
    });

    return space;
  }

  async mySpaces(sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const session = await this.authService.getSession(sessionId);

    const spaces = await this.prisma.space.findMany({
      where: {
        hostId: session?.hostId,
      },
      include: {
        Address: true,
      },
    });

    return spaces;
  }

  async fetchSpace(spaceId: string) {
    const spaces = await this.prisma.space.findUnique({
      where: {
        id: spaceId,
      },
      include: {
        Address: true,
        bookings: true,
        reviews: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        host: true,
      },
    });

    return spaces;
  }

  async leaveReview(data: CreateSpaceReviewDto) {
    return await this.prisma.spaceReview.create({
      data: {
        ...data,
      },
    });
  }

  async bookSpace(data: CreateBookingDto) {
    const booking = await this.prisma.booking.create({
      data: {
        ...data,
      },
    });

    const bookedSpace = await this.prisma.space.findUnique({
      where: {
        id: data.spaceId,
      },
      select: {
        title: true,
      },
    });

    //notify owner of the space
    await this.prisma.notification.create({
      data: {
        title: 'Space Booked',
        content: `${bookedSpace?.title} has been booked for ${data.startAt} to ${data.endAt}`,
        type: 'PAYMENT',
        userId: data.hostId,
      },
    });

    return booking;
  }
}
