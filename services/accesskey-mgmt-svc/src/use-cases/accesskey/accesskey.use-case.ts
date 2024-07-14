import { Injectable } from '@nestjs/common';
import { AccessKeyInfo } from '../../domain/entities';
import { IDataServices } from '../../domain/abstracts';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from '../../domain/dtos';
import { AccessKeyFactoryService } from './accesskey-factory.service';

@Injectable()
export class AccessKeyUseCases {
  constructor(
    private dataServices: IDataServices,
    private accessKeyFactoryService: AccessKeyFactoryService,
  ) {}

  getAllAccessKeys(): Promise<AccessKeyInfo[]> {
    return this.dataServices.accessKeyInfo.getAll();
  }

  getAccessKeybyId(id: any): Promise<AccessKeyInfo> {
    return this.dataServices.accessKeyInfo.get(id);
  }
  deleteAccessKeybyId(id: any): Promise<boolean> {
    return this.dataServices.accessKeyInfo.delete(id);
  }
  createAccessKey(
    createAccessKeyDto: CreateAccessKeyDto,
  ): Promise<AccessKeyInfo> {
    const accessKeyInfo =
      this.accessKeyFactoryService.createNewAccessKey(createAccessKeyDto);
    return this.dataServices.accessKeyInfo.create(accessKeyInfo);
  }

  updateAccessKey(
    updateAccessKeyDto: UpdateAccessKeyDto,
  ): Promise<AccessKeyInfo> {
    const accessKey =
      this.accessKeyFactoryService.updateAccessKey(updateAccessKeyDto);
    return this.dataServices.accessKeyInfo.update(
      updateAccessKeyDto._id,
      accessKey,
    );
  }
}
