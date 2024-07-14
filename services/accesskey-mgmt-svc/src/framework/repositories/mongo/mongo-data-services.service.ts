import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../../domain';
import { MongoGenericRepository } from './mongo-generic-repository';
import { AccessKeyInfo, AccessKeyInfoDocument } from './model';

@Injectable()
export class MongoDataServices
  implements IDataServices, OnApplicationBootstrap
{
  accessKeyInfo: MongoGenericRepository<AccessKeyInfo>;
  constructor(
    @InjectModel(AccessKeyInfo.name)
    private accessKeyInfoRepository: Model<AccessKeyInfoDocument>,
  ) {}

  onApplicationBootstrap() {
    this.accessKeyInfo = new MongoGenericRepository<AccessKeyInfo>(
      this.accessKeyInfoRepository,
    );
  }
}
