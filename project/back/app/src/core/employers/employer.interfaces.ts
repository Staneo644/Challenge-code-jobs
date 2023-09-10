import { Employer } from './employer.entity';

export interface EmployerService {

    createEmployer(employerData: Partial<Employer>): Promise<Employer>;

    updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer>;

    deleteEmployer(email: string): Promise<void>;

    getEmployer(email: string): Promise<Employer | null>;

  
}