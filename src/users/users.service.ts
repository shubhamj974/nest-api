import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

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

  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userModel.create({ username, password: hashedPassword });
  }
}
