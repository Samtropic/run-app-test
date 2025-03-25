import { Test, TestingModule } from '@nestjs/testing';
import { RunSessionsController } from './run-sessions.controller';
import { RunSessionsService } from './run-sessions.service';

describe('RunSessionsController', () => {
  let controller: RunSessionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunSessionsController],
      providers: [RunSessionsService],
    }).compile();

    controller = module.get<RunSessionsController>(RunSessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
