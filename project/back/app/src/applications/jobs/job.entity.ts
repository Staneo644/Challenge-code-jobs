import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Employer } from '../employers/employer.entity';
import { JobSeeker } from '../job-seekers/job-seeker.entity';

export enum status {
  actif = 'actif',
  expire = 'expire',
  avenir = 'avenir',
}

export interface jobData {
  employer_email: string;
  money: number;
  status: string;
  description: string;
  enterprise_name: string;
  name: string;
  imageBuffer: string;
  date: Date;
  interested_jobseekers: string[];
}

@Entity()
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  money: number;

  @Column()
  status: status;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column({ name: 'image_buffer' })
  imageBuffer: string;

  @Column({ nullable: true })
  date: Date;

  @ManyToOne(() => Employer, (employer) => employer.jobs)
  employer: Employer;

  @ManyToMany(() => JobSeeker, (jobSeeker) => jobSeeker.jobInterested, {
    nullable: true,
  })
  @JoinTable()
  interested_jobseekers: JobSeeker[];
}
