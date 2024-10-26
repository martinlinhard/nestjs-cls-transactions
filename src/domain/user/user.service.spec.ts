import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppModule } from '../../app.module';
import { ClsService } from 'nestjs-cls';

describe('UserService', () => {
  let service: UserService;
  let clsService: ClsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UserService>(UserService);
    clsService = module.get<ClsService>(ClsService);
  });

  test('Whether context works', async () => {
    console.log("is active (outer)", clsService.isActive());
    await clsService.runWith({}, async () => {
      console.log("is active (inner)", clsService.isActive());
      await expect(() => service.createOrUpdate()).rejects.toThrow();
      const result = await service.userRepository.count();
      expect(result).toEqual(0);
    });
  });
});
