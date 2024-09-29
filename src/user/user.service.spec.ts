import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { getModelToken } from '@nestjs/mongoose';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: {
            userId: 'user001',
            entries: ['entry1', 'entry2'],
            invisibleEntries: ['entry5', 'entry6'],
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
