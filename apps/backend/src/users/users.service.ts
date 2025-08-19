
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {  Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany()
  }
  

}
