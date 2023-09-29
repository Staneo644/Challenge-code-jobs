import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Employer } from '../employers/employer.entity';

@Entity('enterprise')
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;

  @OneToMany(() => Employer, employer => employer.enterprise)
  employers: Employer[];
}