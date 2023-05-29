import { Test, TestingModule } from '@nestjs/testing';
import { RestoMenusService } from './resto-menus.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RestoMenus } from '../../output/entities/RestoMenus';

describe('RestoMenusService', () => {
  let service: RestoMenusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestoMenusService,
        {
          provide: getRepositoryToken(RestoMenus),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RestoMenusService>(RestoMenusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
