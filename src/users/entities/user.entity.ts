import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Role } from '../enums/role.enum';
import { RunSession } from '../../run-sessions/entities/run-session.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  @OneToMany((type) => RunSession, (runSession) => runSession.user, {
    cascade: false,
  })
  runSessions: RunSession[];
}
