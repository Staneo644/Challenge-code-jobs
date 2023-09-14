

export const apiUrl = 'http://localhost:3000';

export enum userEnum {
    notExist = 'notExist',
    isJobSeeker = 'isJobSeeker',
    isEmployer = 'isEmployer',
  };
  

export interface EmployerData {
    surname: string;
    name: string;
    email: string;
    enterprise_name: string;
}

export interface EnterpriseData {
    email_patron: string;
    title: string;
}

export interface User {
    email: string;
    name: string;
    surname: string;
    is_employer: boolean;
}

export interface jobSeekerData {
    email: string;
    surname: string;
    name: string;
}

export interface jobData {
    employer_email: string;
    money: number;
    status: string;
    description: string;
    enterprise_name: string;
    name: string;
    image: string;
    date: string;
    ID: string;
}

