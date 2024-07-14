import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AccessKeyInfoDocument = AccessKeyInfo & Document;

@Schema({ timestamps: true })
export class AccessKeyInfo {
  @Prop()
  expiresAfter: number;

  @Prop()
  rateLimit: number;

  @Prop()
  name: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  accessKey: string;

  @Prop()
  userId: string;

  @Prop()
  isActive: boolean;

}

export const AccessKeyInfoSchema = SchemaFactory.createForClass(AccessKeyInfo);
