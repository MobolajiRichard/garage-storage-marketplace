import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';

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
}
