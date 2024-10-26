import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppModule } from '../../app.module';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  test('Whether context works', async () => {
    await expect(() => service.createOrUpdate()).rejects.toThrow();
    const result = await service.userRepository.count();
    expect(result).toEqual(0);
  });
});
