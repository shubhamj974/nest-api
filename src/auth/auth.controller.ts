import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/create-user.dto';
import { ResponseData } from 'src/common/response';

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
    } catch (error) {
      res.msg = 'Invalid username and password';
      res.status = false;
    }
    return res;
  }
}
