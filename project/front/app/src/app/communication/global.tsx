import { useRouter } from "next/router";
import { toast } from "react-toastify";

export const apiUrl = "http://localhost:3000";

export enum userEnum {
  notExist = "notExist",
  isJobSeeker = "isJobSeeker",
  isEmployer = "isEmployer",
}

export interface UpdatableEmployerData {
  surname: string;
  name: string;
  email: string;
}

export interface EmployerData extends UpdatableEmployerData {
  enterprise_id: number;
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

export interface statusJob {
  status: "actif" | "expire" | "a venir";
}

export interface jobData extends statusJob {
  money: number;
  description: string;
  name: string;
  imageBuffer: string;
  interested_jobseekers : jobSeekerData[];
}

export interface jobDataId extends jobData {
  enterprise_name: string;
  date: Date;
  id: number;
}

export function errorMessage(message: string, error: any): null {
  if (error !== null && error !== undefined) {
    console.log(message, error);
  }
  const router = useRouter()
  router.push("/")
  toast.error(message);
  return null;
}
