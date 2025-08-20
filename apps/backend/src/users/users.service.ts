import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';
import { UpdateProfileDto } from './users.dto';
import { compare, hashSync } from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async me(sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }
    const session = await this.authService.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    return await this.prisma.user.findUnique({
      where: {
        id: session?.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        hostProfile: true,
        profileImage: true,
        phoneNumber: true,
      },
    });
  }

  async updateProfile(sessionId: string, dto: UpdateProfileDto) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }

    const session = await this.authService.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }

    await this.prisma.user.update({
      where: { id: session.userId },
      data: {
        ...dto,
      },
      select: {
        id: true,
        email: true,
        name: true,
        hostProfile: true,
        profileImage: true,
        phoneNumber: true,
      },
    });
  }

  async deleteAccount(sessionId: string) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }

    const session = await this.authService.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }
    return await this.prisma.user.delete({
      where: { id: session.userId },
    });
  }
  
}
