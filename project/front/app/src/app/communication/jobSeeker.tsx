import axios from "axios";
import { jobSeekerData, apiUrl, jobDataId } from "./global";
import { promises } from "dns";
import { errorMessage } from "./global";

export const getJobs = async (email: string): Promise<jobDataId[] | null> => {
  console.log("searching for jobs " + email);
  try {
    const response = await axios.get(`${apiUrl}/jobseekers/jobs/${email}`);
    console.log("found jobs " + email + " : " + response.data);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la recherche des emplois " + email,
        null,
      );
    }
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche des emplois " + email,
      error,
    );
  }
};

export const getJobSeeker = async (
  email: string,
): Promise<jobSeekerData | null> => {
  console.log("searching for job seeker " + email);
  try {
    const response = await axios.get(`${apiUrl}/jobseekers/${email}`);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la recherche du candidat " + email,
        null,
      );
    }
    console.log("found job seeker " + email + " : " + response.data);

    const data: jobSeekerData = {
      email: response.data.email,
      name: response.data.name,
      surname: response.data.surname,
    };

    return data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche du candidat " + email,
      null,
    );
  }
};

export const addSeeingJob = async (
  email: string,
  jobData: number,
  valid: boolean,
): Promise<boolean | null> => {
  console.log("adding job " + jobData + " of " + email);
  try {
    const response = await axios.post(
      `${apiUrl}/jobseekers/${email}/${jobData}`,
      { validate: valid },
    );

    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 201
    ) {
      return errorMessage(
        "Erreur lors de l'ajout de l'emploi " + jobData + " de " + email,
        null,
      );
    }
    console.log("Response:");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la recherche du candidat " + email,
      error,
    );
  }
};
