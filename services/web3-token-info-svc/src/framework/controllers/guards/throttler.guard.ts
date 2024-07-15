import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerException,
  ThrottlerStorageService,
} from '@nestjs/throttler';
import { Reflector } from '@nestjs/core';
import { ThrottlerRequest } from '@nestjs/throttler/dist/throttler.guard.interface';
import { AccessKeyUseCases } from 'src/use-cases/accesskey/accesskey.use-case';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  private readonly logger = new Logger(CustomThrottlerGuard.name);

  constructor(
    @Inject(forwardRef(() => AccessKeyUseCases))
    private readonly tokenService: AccessKeyUseCases,
  ) {
    super(
      {
        throttlers: [{ ttl: 60000, limit: 10 }],
      },
      new ThrottlerStorageService(),
      new Reflector(),
    );
  }
  async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const accessKey = requestProps.context.getArgs()[0]['accessKey'];
    const key = this.generateKey(
      requestProps.context,
      accessKey,
      requestProps.throttler.name,
    );
    const { totalHits } = await this.storageService.increment(
      key,
      requestProps.ttl,
      requestProps.limit,
      requestProps.blockDuration,
      requestProps.throttler.name,
    );
    const keyInfo = await this.tokenService.getAccessKeybyId(accessKey);
    const expiresAt = new Date(keyInfo.createdAt);
    expiresAt.setDate(expiresAt.getDate() + keyInfo.expiresAfter);
    if (!keyInfo.isActive) {
      this.logger.log(
        this.getLogText(accessKey, ` denied since key is disabled`),
      );
      throw new RpcException({
        message: 'Access Key Not Active',
        name: 'DISABLED_ACCESSKEY_ERROR',
      });
    }
    if (expiresAt.getTime() < new Date().getTime()) {
      this.logger.log(
        this.getLogText(accessKey, ` denied since key is expired`),
      );
      throw new RpcException({
        message: 'Access Key Expired',
        name: 'EXPIRED_ACCESSKEY_ERROR',
      });
    }
    if (totalHits > (keyInfo?.rateLimit || 60)) {
      this.logger.log(
        this.getLogText(
          accessKey,
          ` denied since rate limit for key is reached`,
        ),
      );
      throw new RpcException({
        message: 'Too many requests with the access key',
        name: 'ACCESSKEY_LIMIT_ERROR',
      });
    }
    this.logger.log(this.getLogText(accessKey, ` successful`));
    return true;
  }
  getLogText(key, status) {
    return `Access to token info with key ${key} is ${status}`;
  }
}
