import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/create-user.dto';
import { ResponseData } from 'src/common/response';
import { response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const res = new ResponseData();
    if (!loginDto) {
      return { message: 'Invalid username and password' };
    }
    try {
      const result = await this.authService.login(loginDto);
      res.data = result;
      res.msg = 'Login successfully';
    } catch (error) {
      res.msg = 'Invalid username and password';
      res.status = false;
    }
    return res;
  }

  @Post('verify-token')
  async verifyToken(@Request() req: any) {
    const res = new ResponseData();
    try {
      const token = req.body.token;
      if (!token) {
        throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
      }
      const payload = await this.authService.validateToken(token);
      res.data = payload;
      res.msg = 'token Valid';
      if (!payload) {
        throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      (res.status = false), (res.statusCode = HttpStatus.UNAUTHORIZED);
    }

    return res;
  }
}
