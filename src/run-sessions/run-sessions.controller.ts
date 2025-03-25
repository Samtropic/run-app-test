import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RunSessionsService } from './run-sessions.service';
import { CreateRunSessionDto } from './dto/create-run-session.dto';
import { UpdateRunSessionDto } from './dto/update-run-session.dto';

@Controller('run-sessions')
export class RunSessionsController {
  constructor(private readonly runSessionsService: RunSessionsService) {}

  @Post()
  create(@Body() createRunSessionDto: CreateRunSessionDto) {
    return this.runSessionsService.create(createRunSessionDto);
  }

  @Get()
  findAll() {
    return this.runSessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runSessionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRunSessionDto: UpdateRunSessionDto) {
    return this.runSessionsService.update(+id, updateRunSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.runSessionsService.remove(+id);
  }
}
