import { Employer } from './employer.entity';


export interface IEmployersDomain {

    createEmployer(employerData: Employer): Promise<Employer | null>;

    updateEmployer(email: string, employerData: Partial<Employer>): Promise<Employer | null>;

    isEmployer(email: string): Promise<boolean>;

    deleteEmployer(email: string): Promise<void>;

    getEmployer(email: string): Promise<Employer | null>;

}