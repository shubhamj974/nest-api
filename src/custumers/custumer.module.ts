import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Custumer } from './customer.model';
import { CustumerService } from './customer.service';
import { CustumerController } from './custumer.controllers';

@Module({
  imports: [SequelizeModule.forFeature([Custumer], 'shubham')],
  providers: [CustumerService],
  controllers: [CustumerController],
})
export class CustumerModule {}
