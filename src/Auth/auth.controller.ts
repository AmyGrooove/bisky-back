import { Controller, Post, Body, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginUserDto } from '@/dto/loginUser.dto';
import { RegisterUserDto } from '@/dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('/login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
