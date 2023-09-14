import { EnterpriseData, apiUrl } from "./global";
import axios, { Axios, AxiosError } from "axios";

export const createEnterprise = async (entreprise:EnterpriseData) => {
    console.log("creating enterprise " + entreprise.title)
    try {
        const response = await axios.post(`${apiUrl}/enterprises`, {email_patron: entreprise.email_patron, title: entreprise.title} );
        console.log("created enterprise " + entreprise.title + " : " + response.data)
        if (response.status !== 201) {
            throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
        }
        console.log(response.data)
        if (response.data === "") {
            return false;
        }
        return true;
    }
    catch (error: any) {
        if (error.response.status === 400) {
            return false;
        }
        throw error;
    }
};

export const getEnterprise = async () => {
    console.log("searching for enterprise")
    try {
        const response = await axios.get(`${apiUrl}/enterprises` );
    
        if (response.status !== 200) {
            throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
        }
        console.log("found enterprise : " + response.data)
        console.log(response.data)
        let data:EnterpriseData[] = [];
        for (let i = 0; i < response.data.length; i++) {
            data.push({email_patron: response.data[i].email_patron, title: response.data[i].title})
        }
        return data;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des l\'entreprise :', error);
        throw error;
    }
};

export const deleteEnterprise = async (title:string) => {
    console.log("deleting enterprise " + title)
    try {
        const response = await axios.delete(`${apiUrl}/enterprises/${title}`, {data: {title: title}});
        console.log("deleted enterprise " + title + " : " + response.data)
        if (response.status !== 200) {
            throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
        }
    }
    catch (error) {
        console.error('Erreur lors de la suppression de l\'entreprise :', error);
        throw error;
    }
};