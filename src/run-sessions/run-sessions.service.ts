import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateRunSessionDto } from './dto/create-run-session.dto';
import { UpdateRunSessionDto } from './dto/update-run-session.dto';
import { Role } from 'src/users/enums/role.enum';
import { ActiveUserData } from '../iam/interfaces/active-user-data.interface';
import { RunSession } from './entities/run-session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RunSessionsService {
  constructor(
    @InjectRepository(RunSession)
    private readonly runSessionsRepository: Repository<RunSession>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createRunSessionDto: CreateRunSessionDto,
    authUser: ActiveUserData,
  ) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: authUser.sub },
      });
      if (!user) {
        throw new UnauthorizedException(
          'You cannot create session without an authenticated user',
        );
      }
      const { distance, duration } = createRunSessionDto;
      // Average speed computing (km/h)
      const averageSpeed = distance / 1000 / (duration / 3600);
      // Average pace computing (secondes/km)
      const averagePace = Math.round(duration / (distance / 1000));

      const runSession = this.runSessionsRepository.create({
        ...createRunSessionDto,
        averageSpeed,
        averagePace,
        user,
      });
      return this.runSessionsRepository.save(runSession);
    } catch (error) {
      // TODO: Use a logger instead
      console.error('Caught an error while creating an user:', error);
      throw new BadRequestException('Failed to process user creation request');
    }
  }

  async findByUserId(userId: string) {
    const extractedNumber = userId.match(/^\d+$/)?.[0];
    const parsedId = extractedNumber ? parseInt(extractedNumber, 10) : NaN;

    if (isNaN(parsedId) || parsedId < 1) {
      throw new BadRequestException('Invalid ID: Must be a positive integer');
    }
    const user = await this.usersRepository.findOne({
      where: { id: parsedId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.runSessionsRepository.find({
      where: { user: { id: parsedId } },
      relations: ['user'],
    });
  }

  async findAllOwned(user: ActiveUserData): Promise<RunSession[]> {
    return this.runSessionsRepository.find({
      where: { user: { id: user.sub } },
    });
  }

  async findAll(user: ActiveUserData): Promise<RunSession[]> {
    if (user.role === Role.Admin) {
      return await this.runSessionsRepository.find({ relations: ['user'] });
    } else {
      return this.findAllOwned(user);
    }
  }

  async findOne(id: number): Promise<RunSession> {
    return await this.runSessionsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateRunSessionDto: UpdateRunSessionDto) {
    const runSession = await this.runSessionsRepository.preload({
      id,
      ...updateRunSessionDto,
    });
    if (!runSession) throw new NotFoundException(`runSession #${id} not found`);
    const distance = updateRunSessionDto?.distance ?? runSession.distance;
    const duration = updateRunSessionDto?.duration ?? runSession.duration;
    // Average speed computing (km/h)
    const averageSpeed = distance / 1000 / (duration / 3600);
    // Average pace computing (secondes/km)
    const averagePace = Math.round(duration / (distance / 1000));
    const runSessionUpdated = {
      ...runSession,
      averagePace,
      averageSpeed,
    };

    return this.runSessionsRepository.save(runSessionUpdated);
  }

  async remove(id: number) {
    const runSession = await this.runSessionsRepository.findOne({
      where: { id },
    });
    if (!runSession) throw new NotFoundException(`runSession #${id} not found`);
    return this.runSessionsRepository.remove(runSession);
  }

  async linkRunSessionToUser(
    runSessionId: number,
    userId: number,
  ): Promise<RunSession> {
    const runSession = await this.runSessionsRepository.findOne({
      where: { id: runSessionId },
    });
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!runSession) {
      throw new NotFoundException('RunSession not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    runSession.user = user;
    return this.runSessionsRepository.save(runSession);
  }
}
