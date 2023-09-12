import { data } from "autoprefixer";
import { getEmployer } from "./employer";
import { getJobSeeker } from "./jobSeeker";

export const apiUrl = 'http://localhost:3000';

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

export const userExist = async (email:string) => {
    
    const responseEmployer = await getEmployer(email);
    if (responseEmployer !== null) {
        console.log(responseEmployer.email, " already exist");
        return true;
    }
    const responseJobSeeker = await getJobSeeker(email);
    if (responseJobSeeker !== null) {
        console.log(responseJobSeeker.email, " already exist");
        return true;
    }

    
    return false;
} 