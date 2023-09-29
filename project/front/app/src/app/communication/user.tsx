import axios from "axios";
import {
  EmployerData,
  apiUrl,
  errorMessage,
  jobSeekerData,
  userEnum,
} from "./global";

export const createUser = async (
  employerData: EmployerData | jobSeekerData,
): Promise<userEnum | null> => {
  console.log("creating user " + employerData.email);
  try {
    const response = await axios.post(`${apiUrl}/users`, employerData);
    console.log("created user " + employerData.email + " : ");
    console.log(response.data);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 201
    ) {
      return errorMessage(
        "Erreur lors de la création de l'utilisateur " + employerData.email,
        null,
      );
    }

    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la création de l'utilisateur " + employerData.email,
      error,
    );
  }
};

export const getUser = async (email: string): Promise<userEnum | null> => {
  console.log("searching for user " + email);
  try {
    const user = await axios.get(`${apiUrl}/users/${email}`);
    console.log("found user " + email + " : ");
    console.log(user.data);
    if (user.data.length !== 0) {
      if (user.data === userEnum.isEmployer) return userEnum.isEmployer;
      if (user.data === userEnum.isJobSeeker) return userEnum.isJobSeeker;
    }
  } catch (error) {
    errorMessage(
      "Erreur lors de la recherche de l'utilisateur " + email,
      error,
    );
    return null;
  }
  return userEnum.notExist;
};

export const deleteUser = async (email: string): Promise<boolean | null> => {
  console.log("deleting user " + email);
  try {
    const response = await axios.delete(`${apiUrl}/users/${email}`);
    console.log("deleted user " + email + " : " + response.data);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200 ||
      response.data === false
    ) {
      return errorMessage(
        "Erreur lors de la suppression de l'utilisateur " + email,
        null,
      );
    }
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la suppression de l'utilisateur " + email,
      error,
    );
  }
};

export const userExist = async (email: string) => {
  const user = await getUser(email);
  if (!user || user === userEnum.notExist) return false;
  return true;
};

export const updateUser = async (
  email: string,
  employerData: EmployerData | jobSeekerData,
): Promise<boolean | null> => {
  console.log("updating user " + email);
  try {
    const response = await axios.put(`${apiUrl}/users/${email}`, employerData);
    console.log("updated user " + email + " : " + response.data);
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage(
        "Erreur lors de la mise à jour de l'utilisateur " + email,
        null,
      );
    }
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la mise à jour de l'utilisateur " + email,
      error,
    );
  }
};
