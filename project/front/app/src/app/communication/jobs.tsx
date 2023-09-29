import axios from "axios";
import { apiUrl, jobData } from "./global";
import { errorMessage } from "./global";

export const createJob = async (
  employerEmail: string,
  jobData: jobData,
): Promise<boolean | null> => {
  console.log(
    "creating job " + jobData.name + " of " + employerEmail + " : " + jobData,
  );
  try {
    const response = await axios.post(
      `${apiUrl}/jobs/${employerEmail}`,
      jobData,
    );
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 201
    ) {
      return errorMessage(
        "Erreur lors de la création de l'emploi " +
          jobData.name +
          " de " +
          employerEmail,
        null,
      );
    }
    console.log("Response:", response.data);
    return true;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la création de l'emploi " +
        jobData.name +
        " de " +
        employerEmail,
      error,
    );
  }
};

export const findAllJobs = async (): Promise<jobData[] | null> => {
  console.log("searching for all jobs");
  try {
    const response = await axios.get(`${apiUrl}/findAllJobs`);
    console.log("found all jobs : " + response.data);
    return response.data;
  } catch (error) {
    errorMessage("Erreur lors de la recherche de tous les emplois", error);
    return null;
  }
};

export const updateJob = async (
  jobId: number,
  jobData: jobData,
): Promise<boolean | null> => {
  console.log("updating job " + jobId);
  try {
    const response = await axios.put(`${apiUrl}/jobs/${jobId}`, jobData);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la mise à jour de l'emploi " + jobId,
        null,
      );
    }
    console.log("updated job " + jobId + " : " + response.data);
    return true;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la mise à jour de l'emploi " + jobId,
      error,
    );
  }
};

export const addInterestedUser = async (
  email: string,
  jobData: jobData,
): Promise<boolean | null> => {
  console.log("adding user" + email + "to job " + jobData);
  try {
    const response = await axios.post(`${apiUrl}/jobs/${email}`, jobData);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de l'ajout de l'utilisateur " +
          email +
          " à l'emploi " +
          jobData,
        null,
      );
    }
    console.log(
      "added interested user to job " + email + " : " + response.data,
    );
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de l'ajout de l'utilisateur " +
        email +
        " à l'emploi " +
        jobData,
      error,
    );
  }
};

export const deleteJob = async (
  employerEmail: string,
  jobId: string,
): Promise<boolean | null> => {
  console.log("deleting job " + jobId + " of " + employerEmail);
  try {
    const response = await axios.delete(
      `${apiUrl}/jobs/${jobId}`,
    );
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la suppression de l'emploi " +
          jobId +
          " de " +
          employerEmail,
        null,
      );
    }
    console.log(
      "deleted job " + jobId + " of " + employerEmail + " : " + response.data,
    );
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la suppression de l'emploi " +
        jobId +
        " de " +
        employerEmail,
      error,
    );
  }
};
