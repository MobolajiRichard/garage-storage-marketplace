import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignupDto) {
    return this.authService.signup(signUpDto);
  }

  @Post('check-email')
  checkEmail(@Body() { email }: { email: string }) {
    return this.authService.checkEmail(email);
  }

  @Post('change-password')
  @UseGuards(AuthGuard)
  async deleteMe(
    @Request() req,
    @Body()
    data: {
      oldPassword: string;
      newPassword: string;
    },
  ) {
    return this.authService.changePassword(req['x-session-id'], data);
  }
}
