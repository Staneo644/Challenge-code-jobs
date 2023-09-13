import axios from "axios";
import { getEmployer } from "./employer";
import { getJobSeeker } from "./jobSeeker";

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

export const userParam = async (email:string) => {
    
    const user = await axios.get(`${apiUrl}/user/${email}`);
    if (user.data.length !== 0) {
        if (user.data === userEnum.isEmployer) 
            return userEnum.isEmployer;
        if (user.data === userEnum.isJobSeeker) 
            return userEnum.isJobSeeker;
    }
    return userEnum.notExist;
} 

export const userExist = async (email:string) => {
    const user = await userParam(email);
    if (user === userEnum.notExist)
        return false;
    return true;
}