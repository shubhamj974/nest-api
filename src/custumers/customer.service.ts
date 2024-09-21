import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundError } from 'rxjs';
import { Custumer } from './customer.model';

@Injectable()
export class CustumerService {
  constructor(
    @InjectModel(Custumer, 'shubham')
    private readonly custumerModel: typeof Custumer,
  ) {}

  async getAllCustumer() {
    try {
      let data = await this.custumerModel.findAll();
      console.log('data', data);
      return data;
    } catch (error) {
      throw new NotFoundException('Something went wrong');
    }
  }
}
