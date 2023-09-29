import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Job } from '../jobs/job.entity';

@Entity()
export class JobSeeker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  surname: string;

  @Column()
  name: string;

  @Column('integer', { array: true, nullable: true })
  jobSeeing: number[];

  @ManyToMany(() => Job, (job) => job.interested_jobseekers, { nullable: true })
  jobInterested: Job[];
}
