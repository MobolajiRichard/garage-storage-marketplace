import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomUUID } from 'crypto';
import { DateTime } from 'luxon';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email.trim().toLowerCase(),
      },
    });

    return user;
  }

  async checkEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Please attach email');
    }

    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    return user;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not found');
    }

    const isPasswordValid = await compare(password, user.password || '');

    if (!isPasswordValid) {
      throw new BadRequestException('Passwords do not match');
    }
    return await this.createSession(user.id);
  }

  async signup({
    email,
    password,
    name,
    accountType,
  }: {
    email: string;
    password: string;
    name: string;
    accountType: string;
  }) {
    const user = await this.findByEmail(email);

    if (user) {
      throw new ConflictException('Email already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: email.trim().toLowerCase(),
        name,
        password: hashSync(password, SALT_ROUNDS),
      },
    });

    //If account type is host, create a host profile
    if (accountType === 'host') {
      await this.prisma.hostProfile.create({
        data: {
          userId: newUser.id,
        },
      });
    }

    //send welcome notification
    await this.prisma.notification.create({
      data: {
        title: 'Welcome to Garage Space',
        content: `Find the perfect place to store your car, bike, or household items with ease. 
            Garage Space connects you to secure, affordable, and convenient storage options 
          around the world`,
        type: 'SYSTEM',
        userId: newUser.id,
      },
    });

    return await this.createSession(newUser.id);
  }

  async createSession(userId: string, device?: string, ip?: string) {
    const sessionId = randomUUID();

    const token = await this.jwtService.signAsync({ id: sessionId });

    //store session and token
    await this.prisma.session.create({
      data: {
        id: sessionId,
        userId,
        isActive: true,
        device,
        ip,
        lastActive: new Date(),
        expiresAt: DateTime.now().plus({ years: 1 }).toJSDate(),
      },
    });

    return { token };
  }

  async getSession(sessionId: string) {
    if (!sessionId) {
      return null;
    }

    const session = await this.prisma.session.findUnique({
      where: {
        id: sessionId,
        expiresAt: {
          gt: new Date(),
        },
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            isActive: true,
            hostProfile: true,
          },
        },
      },
    });

    if (!session || !session.user || !session.user.isActive) {
      return null;
    }

    await this.prisma.session.update({
      where: { id: session.id },
      data: { lastActive: new Date() },
    });

    return {
      sessionId: session.id,
      userId: session.user.id,
      hostId: session.user.hostProfile?.id,
    };
  }

  async changePassword(
    sessionId: string,
    {
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    },
  ) {
    if (!sessionId) {
      throw new UnauthorizedException();
    }

    const session = await this.getSession(sessionId);

    if (!session) {
      throw new UnauthorizedException();
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      select: {
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordValid = await compare(oldPassword, user.password || '');

    if (!isPasswordValid) {
      throw new ConflictException();
    }

    await this.prisma.user.update({
      where: {
        id: session.userId,
      },
      data: {
        password: hashSync(newPassword, SALT_ROUNDS),
      },
    });
  }
}
