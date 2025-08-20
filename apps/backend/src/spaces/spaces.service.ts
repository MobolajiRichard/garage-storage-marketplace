import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSpaceDto } from './spaces.dto';

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
}
