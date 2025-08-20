import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './users.controller';

@Module({
  imports: [AuthModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
