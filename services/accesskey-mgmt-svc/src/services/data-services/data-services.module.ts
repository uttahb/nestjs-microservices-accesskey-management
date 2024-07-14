import { Module } from '@nestjs/common';
import { MongoDataServicesModule } from '../../framework/repositories/mongo/mongo-data-services.module';

@Module({
  imports: [MongoDataServicesModule],
  exports: [MongoDataServicesModule],
})
export class DataServicesModule {}
