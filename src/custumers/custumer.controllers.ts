import { Controller, Get } from '@nestjs/common';
import { ResponseData } from 'src/common/response';
import { CustumerService } from './customer.service';

@Controller('custumer')
export class CustumerController {
  constructor(private _custumerService: CustumerService) {}
  @Get('data')
  async getAllCustumer() {
    const output = new ResponseData();
    try {
      let data = await this._custumerService.getAllCustumer();
      output.data = data;
      output.msg = 'All Custumer Data!';
    } catch (error) {
      console.log(error);
    }
    return output;
  }
}
