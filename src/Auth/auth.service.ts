import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';

import { validationRegex } from '../../public/constatns';
import { User, UserDocument } from '../schems/User.schema';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { LoginUserDto } from '../dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    try {
      const existingUser = await this.userModel.findOne({
        $or: [
          { login: registerUserDto.login },
          { email: registerUserDto.email },
        ],
      });

      if (existingUser) {
        if (existingUser.login === registerUserDto.login) {
          throw 1;
        } else {
          throw 2;
        }
      }

      if (
        !validationRegex.login.test(registerUserDto.login) ||
        !validationRegex.email.test(registerUserDto.email) ||
        !validationRegex.password.test(registerUserDto.password)
      ) {
        throw 3;
      }

      const newUser = new this.userModel({
        login: registerUserDto.login,
        password_hash: await bcrypt.hash(registerUserDto.password, 5),
        email: registerUserDto.email,
      });
      await newUser.save();

      return true;
    } catch (error) {
      switch (error) {
        case 1:
          return new HttpException('Login is taken', HttpStatus.BAD_REQUEST);
        case 2:
          return new HttpException('Email is taken', HttpStatus.BAD_REQUEST);
        case 3:
          return new HttpException('Incorrect data', HttpStatus.BAD_REQUEST);
        default:
          console.log(error);
          return new HttpException('Error', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      let user;

      if (validationRegex.email.test(loginUserDto.login_email)) {
        user = await this.userModel.findOne({
          email: loginUserDto.login_email,
        });
      } else {
        user = await this.userModel.findOne({
          login: loginUserDto.login_email,
        });
      }

      if (
        user &&
        (await bcrypt.compare(loginUserDto.password, user.password_hash))
      ) {
        return true;
      } else {
        throw validationRegex.email.test(loginUserDto.login_email) ? 2 : 1;
      }
    } catch (error) {
      switch (error) {
        case 1:
          throw new HttpException(
            'Incorrect login or password',
            HttpStatus.BAD_REQUEST,
          );
        case 2:
          throw new HttpException(
            'Incorrect email or password',
            HttpStatus.BAD_REQUEST,
          );
        default:
          console.log(error);
          throw new HttpException('Error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
