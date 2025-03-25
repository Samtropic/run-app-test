import { Injectable } from '@nestjs/common';
import { CreateRunSessionDto } from './dto/create-run-session.dto';
import { UpdateRunSessionDto } from './dto/update-run-session.dto';

@Injectable()
export class RunSessionsService {
  create(createRunSessionDto: CreateRunSessionDto) {
    return 'This action adds a new runSession';
  }

  findAll() {
    return `This action returns all runSessions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} runSession`;
  }

  update(id: number, updateRunSessionDto: UpdateRunSessionDto) {
    return `This action updates a #${id} runSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} runSession`;
  }
}
