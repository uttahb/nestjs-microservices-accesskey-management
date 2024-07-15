import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from './types';

@Controller('admin/access-key')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async generateAccessKey(@Body() accessKeyData: CreateAccessKeyDto) {
    return this.appService.generateAccessKey(accessKeyData);
  }
  @Put(':id')
  async updateAccessKey(
    @Param('id') id: string,
    @Body() accessKeyData: UpdateAccessKeyDto,
  ) {
    accessKeyData._id = id;
    return this.appService.updateAccessKey(accessKeyData);
  }

  @Delete(':id')
  async deleteAccessKey(@Param('id') id: string) {
    return this.appService.deleteAccessKey(id);
  }
  @Get()
  async getAccessKeys() {
    return this.appService.getAccessKeys();
  }
}
