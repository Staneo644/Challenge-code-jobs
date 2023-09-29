import axios from "axios";
import {
  EmployerData,
  apiUrl,
  jobData,
  jobDataId,
  UpdatableEmployerData,
} from "./global";
import { errorMessage } from "./global";

export const getEmployer = async (
  email: string,
): Promise<EmployerData | null> => {
  console.log("searching for employer " + email);
  try {
    const response = await axios.get(`${apiUrl}/employers/${email}`);

    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la recherche de l'employeur " + email,
        null,
      );
    }
    console.log("found employer " + email + " : " + response.data);

    const data: EmployerData = {
      email: response.data.email,
      name: response.data.name,
      surname: response.data.surname,
      enterprise_id: 0,
    };

    return data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche de l'employeur " + email,
      error,
    );
  }
};

export const getEmployerJobs = async (
  employerEmail: string,
): Promise<jobDataId[] | null> => {
  console.log("searching for jobs of " + employerEmail);
  try {
    const response = await axios.get(
      `${apiUrl}/employers/jobs/${employerEmail}`,
    );
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la recherche des emplois de l'employeur " +
          employerEmail,
        null,
      );
    }
    console.log("found jobs of " + employerEmail + " : ");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche des emplois de l'employeur " + employerEmail,
      error,
    );
  }
};

export const getEmployerJobsWithImage = async (
  employerEmail: string,
): Promise<jobDataId[] | null> => {
  console.log("searching for jobs of " + employerEmail);
  try {
    const response = await axios.get(
      `${apiUrl}/employers/jobs/images/${employerEmail}`,
    );
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la recherche des emplois de l'employeur " +
          employerEmail,
        null,
      );
    }
    console.log("found jobs of " + employerEmail + " : ");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche des emplois de l'employeur " + employerEmail,
      error,
    );
  }
};
