import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class RunSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  runSessionType: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP(6)' })
  startDateTime: Date;

  @Column()
  distance: number;

  @Column()
  duration: number;

  @Column({ type: 'float' })
  averageSpeed: number;

  @Column({ type: 'int' })
  averagePace: number;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.runSessions, { onDelete: 'CASCADE' })
  user: User;
}
