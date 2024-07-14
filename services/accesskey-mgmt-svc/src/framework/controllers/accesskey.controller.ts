import { Controller } from '@nestjs/common';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from '../../domain/dtos';
import { AccessKeyUseCases } from '../../use-cases/accesskey/accesskey.use-case';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AccessKeyController {
  constructor(private accessKeyUsecases: AccessKeyUseCases) {}

  @MessagePattern({ cmd: 'get-all-access-keys' })
  async getAll() {
    return this.accessKeyUsecases.getAllAccessKeys();
  }

  @MessagePattern({ cmd: 'get-access-key-info-by-id' })
  async getById(@Payload() id: string) {
    console.log('id is ', id);
    return this.accessKeyUsecases.getAccessKeybyId(id);
  }

  @MessagePattern({ cmd: 'delete-access-key' })
  async deleteById(@Payload() id: string) {
    console.log(id);
    return this.accessKeyUsecases.deleteAccessKeybyId(id);
  }

  @MessagePattern({ cmd: 'create-access-key' })
  createAccessKey(@Payload() accessKeyDto: CreateAccessKeyDto) {
    console.log(accessKeyDto);
    return this.accessKeyUsecases.createAccessKey(accessKeyDto);
  }

  @MessagePattern({ cmd: 'update-access-key' })
  updateAccessKey(@Payload() updateAccessKeyDto: UpdateAccessKeyDto) {
    return this.accessKeyUsecases.updateAccessKey(updateAccessKeyDto);
  }
}
