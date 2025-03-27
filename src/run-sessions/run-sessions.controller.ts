import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { RunSessionsService } from './run-sessions.service';
import { CreateRunSessionDto } from './dto/create-run-session.dto';
import { UpdateRunSessionDto } from './dto/update-run-session.dto';
import { ActiveUser } from '../iam/decorators/active-user-decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { ApiTags } from '@nestjs/swagger';
import { RunSession } from './entities/run-session.entity';
import { LinkRunSessionDto } from './dto/link-run-session.dto';
import { Roles } from '../iam/authorizarion/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { mixinCheckOwnership } from '../iam/authorizarion/interceptors/check-ownership.interceptor';
import { ExcludePasswordInterceptor } from '../common/interceptors/exclude-password/exclude-password.interceptor';

@ApiTags('run-sessions')
@UseInterceptors(ExcludePasswordInterceptor)
@Controller('run-sessions')
export class RunSessionsController {
  constructor(private readonly runSessionsService: RunSessionsService) {}

  @Post()
  create(
    @Body() createRunSessionDto: CreateRunSessionDto,
    @ActiveUser() authUser: ActiveUserData,
  ) {
    return this.runSessionsService.create(createRunSessionDto, authUser);
  }

  @Get()
  findAll(@ActiveUser() authUser: ActiveUserData) {
    return this.runSessionsService.findAll(authUser);
  }

  @UseInterceptors(mixinCheckOwnership(RunSession))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runSessionsService.findOne(+id);
  }

  @UseInterceptors(mixinCheckOwnership(RunSession))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRunSessionDto: UpdateRunSessionDto,
  ) {
    return this.runSessionsService.update(+id, updateRunSessionDto);
  }

  @UseInterceptors(mixinCheckOwnership(RunSession))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.runSessionsService.remove(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id/link')
  async linkRunSession(
    @Param('id') runSessionId: number,
    @Body() linkRunSessionDto: LinkRunSessionDto,
  ): Promise<RunSession> {
    return this.runSessionsService.linkRunSessionToUser(
      runSessionId,
      linkRunSessionDto.userId,
    );
  }
}
