import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User, 'shubham')
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({
      where: { username },
    });
  }

  async createUser(loginDto: LoginDto): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(loginDto.password, 10);
      const createUser = {
        username: loginDto.username,
        password: hashedPassword,
      };
      return this.userModel.create(createUser);
    } catch (error) {
      return error;
    }
  }
}
