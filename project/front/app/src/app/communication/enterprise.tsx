import { EnterpriseData, apiUrl, errorMessage } from "./global";
import axios, { Axios, AxiosError } from "axios";

export const createEnterprise = async (
  entreprise: EnterpriseData,
): Promise<number | null> => {
  console.log("creating enterprise " + entreprise.title);
  try {
    const response = await axios.post(`${apiUrl}/enterprises`, {
      email_patron: entreprise.email_patron,
      title: entreprise.title,
    });
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 201
    ) {
      return errorMessage(
        "Erreur lors de la création de l'entreprise " + entreprise.title,
        null,
      );
    }
    console.log(
      "created enterprise " + entreprise.title + " : " + response.data,
    );
    return response.data;
  } catch (error: any) {
    return errorMessage(
      "Erreur lors de la création de l'entreprise " + entreprise.title,
      error,
    );
  }
};

export const getEnterprise = async (): Promise<EnterpriseData[] | null> => {
  console.log("searching for enterprise");
  try {
    const response = await axios.get(`${apiUrl}/enterprises`);

    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200
    ) {
      return errorMessage("Erreur lors de la recherche de l'entreprise", null);
    }
    console.log("found enterprise : " + response.data);
    console.log(response.data);
    let data: EnterpriseData[] = [];
    for (let i = 0; i < response.data.length; i++) {
      data.push({
        email_patron: response.data[i].email_patron,
        title: response.data[i].title,
      });
    }
    return data;
  } catch (error) {
    return errorMessage("Erreur lors de la recherche de l'entreprise", error);
  }
};

export const deleteEnterprise = async (
  title: string,
): Promise<boolean | null> => {
  console.log("deleting enterprise " + title);
  try {
    const response = await axios.delete(`${apiUrl}/enterprises/${title}`, {
      data: { title: title },
    });
    if (
      response.data === null ||
      response.data === undefined ||
      response.status !== 200 ||
      response.data === false
    ) {
      return errorMessage(
        "Erreur lors de la suppression de l'entreprise " + title,
        null,
      );
    }
    console.log("deleted enterprise " + title + " : " + response.data);
    return response.data;
  } catch (error) {
    return errorMessage(
      "Erreur lors de la suppression de l'entreprise " + title,
      error,
    );
  }
};
