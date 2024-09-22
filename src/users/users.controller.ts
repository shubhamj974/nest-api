import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.model';
import { ResponseData } from 'src/common/response';
import { LoginDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() loginDto: LoginDto) {
    if (!loginDto) {
      return { message: 'Invalid username and password' };
    }

    const res = new ResponseData();

    try {
      const existingUser = await this.usersService.findOneByUsername(
        loginDto.username,
      );
      if (existingUser) {
        res.msg = 'Username already exists';
        res.status = false;
        return res;
      }

      const data = await this.usersService.createUser(loginDto);
      res.data = data;
      res.msg = 'Sign up successfully completed';
    } catch (error) {
      res.msg = error ? error.message : 'Something went wrong!';
      res.status = false;
    }

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOneById(Number(id));
  }
}
