import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Job, status } from '../jobs/job.entity';
import { Enterprise } from '../enterprises/enterprise.entity';
import { JobSeeker } from '../job-seekers/job-seeker.entity';

export class createEmployer {
  email: string;
  name: string;
  surname: string;
  enterprise_id: string;
}

export class jobSendEmployer {
  name: string;
  description: string;
  money: number;
  status: status;
  id: number;
  imageBuffer: string;
  interested_jobseekers: JobSeeker[];
  date: string;
}

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @Column()
  @IsNotEmpty({ message: 'Surname is required' })
  surname: string;

  @Column()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ManyToOne(() => Enterprise, (enterprise) => enterprise.employers)
  enterprise: Enterprise;

  @OneToMany(() => Job, (job) => job.employer, { cascade: ['remove'] })
  jobs: Job[];
}
