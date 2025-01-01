import { ApiProperty } from '@nestjs/swagger';

export class ResponseData {
  @ApiProperty({ type: Boolean, default: true })
  public status = true;

  @ApiProperty({ type: Object, default: {} })
  public data: any = {};

  @ApiProperty({ type: String, default: '' })
  public msg: String = '';

  @ApiProperty({})
  public statusCode: any = '';

  reset(): void {
    this.status = true;
    this.msg = '';
    this.data = {};
    this.statusCode = '';
  }
}
