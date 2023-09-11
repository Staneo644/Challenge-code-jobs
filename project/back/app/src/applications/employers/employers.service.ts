import { Injectable } from '@nestjs/common';
import { Employer } from '../../core/employers/employer.entity';
import { JobsService } from '../jobs/jobs.service';
import { EmployerService } from '../../core/employers/employer.interfaces';
import { EmployerModel } from '../../core/employers/employer.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EmployersService implements EmployerService {
    constructor(private readonly jobsService: JobsService) {}
  
    

    async createEmployer(employerData: Employer): Promise<Employer> {
      const createdEmployer = new EmployerModel(employerData);
      return createdEmployer.save();
    }
  
    async updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer> {
      const updatedEmployer = await EmployerModel.findOneAndUpdate(
        { email },
        employerData,
        { new: true },
      );
  
      if (!updatedEmployer) {
        throw new NotFoundException(`Employer with email ${email} not found`);
      }
  
      return updatedEmployer;
    }
  
    async deleteEmployer(email: string): Promise<void> {
      const deletedEmployer = await EmployerModel.findOneAndDelete({ email });
  
      if (!deletedEmployer) {
        throw new NotFoundException(`Employer with email ${email} not found`);
      }
    }
  
    async getEmployer(email: string): Promise<Employer | null> {
      return EmployerModel.findOne({ email }).exec();
    }
  }