import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { username: user.username, sub: user.id };
    return await {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return !!payload;
    } catch (error) {
      return false;
    }
  }
}
