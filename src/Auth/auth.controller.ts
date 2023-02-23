import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginUserDto } from 'src/dto/loginUser.dto';
import { RegisterUserDto } from 'src/dto/registerUser.dto';

import { AuthService } from './auth.service';

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
