import { Injectable } from '@nestjs/common';
import { Employer } from '../../core/employers/employer.entity';
import { EmployerModel } from '../../core/employers/employer.entity';

@Injectable()
export class EmployersService {
    

    async createEmployer(employerData: Employer): Promise<Employer> {
      const createdEmployer = new EmployerModel(employerData);
      return createdEmployer.save();
    }

    async getEmployers(): Promise<Employer[]> {
      return EmployerModel.find().exec();
    } 
  
    async updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer> {
      return await EmployerModel.findOneAndUpdate(
        { email },
        employerData
        );
    }
  
    async deleteEmployer(email: string): Promise<void> {
      return await EmployerModel.findOneAndDelete({ email });
    }
  
    async getEmployer(email: string): Promise<Employer | null> {
      return EmployerModel.findOne({ email }).exec();
    }
  }