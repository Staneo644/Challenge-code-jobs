

export const apiUrl = 'http://localhost:3000';

export enum userEnum {
    notExist = 'notExist',
    isJobSeeker = 'isJobSeeker',
    isEmployer = 'isEmployer',
  };
  

export interface UpdatableEmployerData {
    surname: string;
    name: string;
    email: string;
}

export interface EmployerData extends UpdatableEmployerData {
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


export interface statusJob{
    status: 'actif' | 'expire' | 'a venir';
}

export interface jobData extends statusJob{
    employer_email: string;
    money: number;
    description: string;
    name: string;
    imageType: string;
    imageBuffer: Buffer;
}

export interface jobDataId extends jobData {
    enterprise_name: string;
    date: Date;
    _id: string;
}

