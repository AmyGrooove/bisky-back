import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from '../dto/registerUser.dto';
import { User, UserDocument } from '../schems/User.schema';
import { LoginUserDto } from '../dto/loginUser.dto';
import {
  loginValidate,
  emailValidate,
  passwordValidate,
} from '../../constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<boolean | HttpException> {
    try {
      if (await this.userModel.findOne({ login: registerUserDto.login }))
        throw 1;
      if (await this.userModel.findOne({ email: registerUserDto.email }))
        throw 2;

      if (
        !loginValidate.test(registerUserDto.login) ||
        !emailValidate.test(registerUserDto.email) ||
        !passwordValidate.test(registerUserDto.password)
      )
        throw 3;

      const newUser = new this.userModel({
        login: registerUserDto.login,
        password_hash: await bcrypt.hash(registerUserDto.password, 5),
        email: registerUserDto.email,
      });
      newUser.save();

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

  async login(loginUserDto: LoginUserDto): Promise<boolean | HttpException> {
    try {
      if (!emailValidate.test(loginUserDto.login_email)) {
        const user = await this.userModel.findOne({
          login: loginUserDto.login_email,
        });

        if (
          user &&
          (await bcrypt.compare(loginUserDto.password, user.password_hash))
        ) {
          return true;
        } else {
          throw 1;
        }
      } else {
        const user = await this.userModel.findOne({
          email: loginUserDto.login_email,
        });

        if (
          user &&
          (await bcrypt.compare(loginUserDto.password, user.password_hash))
        ) {
          return true;
        } else {
          throw 2;
        }
      }
    } catch (error) {
      switch (error) {
        case 1:
          return new HttpException(
            'Incorrect login or password',
            HttpStatus.BAD_REQUEST,
          );
        case 2:
          return new HttpException(
            'Incorrect email or password',
            HttpStatus.BAD_REQUEST,
          );
        default:
          console.log(error);
          return new HttpException('Error', HttpStatus.BAD_REQUEST);
      }
    }
  }
}
