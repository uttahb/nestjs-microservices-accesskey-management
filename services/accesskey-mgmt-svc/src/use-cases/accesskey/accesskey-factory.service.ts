import { Injectable } from '@nestjs/common';
import { AccessKeyInfo } from '../../domain/entities';
import { CreateAccessKeyDto, UpdateAccessKeyDto } from '../../domain/dtos';

@Injectable()
export class AccessKeyFactoryService {
  createNewAccessKey(createAccessKeyDto: CreateAccessKeyDto) {
    const newAccessKeyInfo = new AccessKeyInfo();
    newAccessKeyInfo.expiresAfter = createAccessKeyDto.expiresAfter;
    newAccessKeyInfo.rateLimit = createAccessKeyDto.rateLimit;
    newAccessKeyInfo.name = createAccessKeyDto.name;
    newAccessKeyInfo.userId = createAccessKeyDto.userId;
    newAccessKeyInfo.isActive = true;
    return newAccessKeyInfo;
  }

  updateAccessKey(updateAccessKeyDto: UpdateAccessKeyDto) {
    const newAccessKeyInfo = new AccessKeyInfo();
    newAccessKeyInfo.expiresAfter = updateAccessKeyDto.expiresAfter;
    newAccessKeyInfo.rateLimit = updateAccessKeyDto.rateLimit;
    newAccessKeyInfo.name = updateAccessKeyDto.name;
    newAccessKeyInfo.isActive = updateAccessKeyDto.isActive;
    return newAccessKeyInfo;
  }
}
