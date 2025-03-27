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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './enums/role.enum';
import { Roles } from '../iam/authorizarion/decorators/roles.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ActiveUser } from '../iam/decorators/active-user-decorator';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { ExcludePasswordInterceptor } from '../common/interceptors/exclude-password/exclude-password.interceptor';

@ApiTags('Users 👥')
@UseInterceptors(ExcludePasswordInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  @ApiOperation({ summary: 'Get authenticated user' })
  @ApiOkResponse({
    type: CreateUserDto,
    description: 'OK',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  me(@ActiveUser() authUser: ActiveUserData) {
    console.log(authUser);
    return this.usersService.findOne(authUser.sub);
  }

  @Roles(Role.Admin)
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'Created Succesfully',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles(Role.Admin)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    isArray: true,
    type: CreateUserDto,
    description: 'OK',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  @ApiOperation({ summary: 'Get one user by his id' })
  @ApiOkResponse({
    type: CreateUserDto,
    description: 'OK',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit one user' })
  @ApiOkResponse({
    type: CreateUserDto,
    description: 'OK',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one user' })
  @ApiOkResponse({
    type: CreateUserDto,
    description: 'OK',
  })
  @ApiNotFoundResponse({
    description: 'Not Found',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
