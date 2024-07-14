import { Test, TestingModule } from '@nestjs/testing';
import { AccessKeyController } from './accesskey.controller';
import { AccessKeyUseCases } from '../..//use-cases/accesskey/accesskey.use-case';
import {
  AccessKeyInfo,
  CreateAccessKeyDto,
  UpdateAccessKeyDto,
} from 'src/domain';

describe('AccessKeyController', () => {
  let controller: AccessKeyController;
  let accessKeyUseCases: AccessKeyUseCases;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessKeyController],
      providers: [
        {
          provide: AccessKeyUseCases,
          useValue: {
            getAllAccessKeys: jest.fn(),
            getAccessKeybyId: jest.fn(),
            deleteAccessKeybyId: jest.fn(),
            createAccessKey: jest.fn(),
            updateAccessKey: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AccessKeyController>(AccessKeyController);
    accessKeyUseCases = module.get<AccessKeyUseCases>(AccessKeyUseCases);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return all access keys', async () => {
      const mockAccessKeys: AccessKeyInfo[] = [
        {
          accessKey: 'sdfsdfs1',
          name: 'Key 1',
          rateLimit: 10,
          expiresAfter: 2,
          userId: 'sdfsdfs',
          isActive: true,
          createdAt: new Date('2021-01-01T00:00:00.000Z'),
          updatedAt: new Date('2021-01-01T00:00:00.000Z'),
        },
        {
          accessKey: 'sdfssdfdfs1',
          name: 'Key 2',
          rateLimit: 10,
          expiresAfter: 2,
          userId: 'sdfsddfs',
          isActive: true,
          createdAt: new Date('2021-02-01T00:00:00.000Z'),
          updatedAt: new Date('2021-02-01T00:00:00.000Z'),
        },
      ];
      jest
        .spyOn(accessKeyUseCases, 'getAllAccessKeys')
        .mockResolvedValue(mockAccessKeys);

      const result = await controller.getAll();

      expect(result).toEqual(mockAccessKeys);
      expect(accessKeyUseCases.getAllAccessKeys).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('should return an access key by id', async () => {
      const mockAccessKey = {
        accessKey: 'sdfsdfs1',
        name: 'Key 1',
        rateLimit: 10,
        expiresAfter: 2,
        userId: 'sdfsdfs',
        isActive: true,
        createdAt: new Date('2021-01-01T00:00:00.000Z'),
        updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      };
      jest
        .spyOn(accessKeyUseCases, 'getAccessKeybyId')
        .mockResolvedValue(mockAccessKey);

      const result = await controller.getById('sdfsdfs1');

      expect(result).toEqual(mockAccessKey);
      expect(accessKeyUseCases.getAccessKeybyId).toHaveBeenCalledWith(
        'sdfsdfs1',
      );
    });

    it('should handle non-existent id', async () => {
      jest.spyOn(accessKeyUseCases, 'getAccessKeybyId').mockResolvedValue(null);

      const result = await controller.getById('999');

      expect(result).toBeNull();
      expect(accessKeyUseCases.getAccessKeybyId).toHaveBeenCalledWith('999');
    });
  });

  describe('deleteById', () => {
    it('should delete an access key by id', async () => {
      jest
        .spyOn(accessKeyUseCases, 'deleteAccessKeybyId')
        .mockResolvedValue(true);

      const result = await controller.deleteById('1');

      expect(result).toBe(true);
      expect(accessKeyUseCases.deleteAccessKeybyId).toHaveBeenCalledWith('1');
    });

    it('should handle deletion of non-existent id', async () => {
      jest
        .spyOn(accessKeyUseCases, 'deleteAccessKeybyId')
        .mockResolvedValue(false);

      const result = await controller.deleteById('999');

      expect(result).toBe(false);
      expect(accessKeyUseCases.deleteAccessKeybyId).toHaveBeenCalledWith('999');
    });
  });

  describe('createAccessKey', () => {
    it('should create a new access key', async () => {
      const createDto: CreateAccessKeyDto = {
        name: 'Key 1',
        rateLimit: 10,
        expiresAfter: 2,
        userId: 'sdfsdfs',
      };
      const createdKey = {
        ...createDto,
        accessKey: '1',
        isActive: true,
        createdAt: new Date('2021-01-01T00:00:00.000Z'),
        updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      };
      jest
        .spyOn(accessKeyUseCases, 'createAccessKey')
        .mockResolvedValue(createdKey);

      const result = await controller.createAccessKey(createDto);

      expect(result).toEqual(createdKey);
      expect(accessKeyUseCases.createAccessKey).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateAccessKey', () => {
    it('should update an existing access key', async () => {
      const updateDto: UpdateAccessKeyDto = {
        name: 'Key 55',
      };
      const updatedKey = {
        accessKey: 'sdfsdfs1',
        name: 'Key 1',
        rateLimit: 10,
        expiresAfter: 2,
        userId: 'sdfsdfs',
        isActive: true,
        createdAt: new Date('2021-01-01T00:00:00.000Z'),
        updatedAt: new Date('2021-01-01T00:00:00.000Z'),
      };
      jest
        .spyOn(accessKeyUseCases, 'updateAccessKey')
        .mockResolvedValue(updatedKey);

      const result = await controller.updateAccessKey(updateDto);

      expect(result.name).toEqual(updatedKey.name);
      expect(accessKeyUseCases.updateAccessKey).toHaveBeenCalledWith(updateDto);
    });

    // it('should handle update of non-existent access key', async () => {
    //   const updateDto: UpdateAccessKeyDto = {
    //     id: '999',
    //     name: 'Non-existent Key',
    //   };
    //   jest.spyOn(accessKeyUseCases, 'updateAccessKey').mockResolvedValue(null);

    //   const result = await controller.updateAccessKey(updateDto);

    //   expect(result).toBeNull();
    //   expect(accessKeyUseCases.updateAccessKey).toHaveBeenCalledWith(updateDto);
    // });
  });
});
