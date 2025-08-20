import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto, CreateSpaceReviewDto } from './spaces.dto';

@Injectable()
export class SpacesService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async createSpace(data: any) {
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
      orderBy: {
        createdAt: 'desc',
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
          orderBy: {
            createdAt: 'desc',
          },
          include: {
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
    await this.prisma.spaceReview.create({
      data: {
        ...data,
      },
    });

    const space = await this.prisma.space.findUnique({
      where: { id: data.spaceId },
      select: { rating: true, ratingCount: true },
    });

    if (!space) {
      throw new NotFoundException();
    }

    //calculate new average rating
    const newCount = space.ratingCount + 1;
    const oldTotal = (space.rating ?? 0) * space.ratingCount;
    const newTotal = oldTotal + data.rating;
    const newRating = Number((newTotal / newCount).toFixed(2));

    //update space with new ratings
    await this.prisma.space.update({
      where: { id: data.spaceId },
      data: {
        rating: newRating,
        ratingCount: newCount,
      },
    });

    return { message: 'Review submitted successfully' };
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

        host: {
          select: {
            userId: true,
          },
        },
      },
    });

    //notify owner of the space
    await this.prisma.notification.create({
      data: {
        title: 'Space Booked',
        content: `${bookedSpace?.title} has been booked for ${data.startAt?.split('T')} to ${data.endAt}`,
        type: 'PAYMENT',
        userId: bookedSpace?.host.userId!,
      },
    });

    return booking;
  }

  async allSpaces(query: {
    category?: string[];
    country?: string;
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
  }) {
    const filters: any = {};

    //category
    if (query.category && query.category.length > 0) {
      filters.categories = { has: query.category };
    }

    //country
    if (query.country) {
      filters.Address = {
        ...(filters.Address || {}),
        country: { equals: query.country, mode: 'insensitive' },
      };
    }

    //city
    if (query.city) {
      filters.Address = {
        ...(filters.Address || {}),
        city: { equals: query.city, mode: 'insensitive' },
      };
    }

    //filter price
    if (query.minPrice && !isNaN(parseFloat(query.minPrice))) {
      filters.price = {
        ...(filters.price || {}),
        gte: parseFloat(query.minPrice),
      };
    }

    if (query.maxPrice && !isNaN(parseFloat(query.maxPrice))) {
      filters.price = {
        ...(filters.price || {}),
        lte: parseFloat(query.maxPrice),
      };
    }

    //ratings
    if (query.minRating && !isNaN(parseFloat(query.minRating))) {
      filters.rating = { gte: parseFloat(query.minRating) };
    }

    return this.prisma.space.findMany({
      where: filters,
      include: {
        Address: true,
        host: true,
      },
    });
  }

  async deleteSpace(spaceId: string) {
    await this.prisma.address.deleteMany({
      where: { spaceId },
    });
    return await this.prisma.space.delete({
      where: { id: spaceId },
    });
  }
}
