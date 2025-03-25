import { Test, TestingModule } from '@nestjs/testing';
import { RunSessionsService } from './run-sessions.service';

describe('RunSessionsService', () => {
  let service: RunSessionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunSessionsService],
    }).compile();

    service = module.get<RunSessionsService>(RunSessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
