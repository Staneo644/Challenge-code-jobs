import { EnterpriseData, apiUrl } from "./global";
import axios from "axios";

export const createEnterprise = async (entreprise:EnterpriseData) => {
    console.log(entreprise)
    console.log(`${apiUrl}/enterprises`);
    try {
        const response = await axios.post(`${apiUrl}/enterprises`, {email_patron: entreprise.email_patron, title: entreprise.title} );
    
        if (response.status !== 201) {
            throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
        }
        console.log(response.data)
        return true;
    }
    catch (error) {
        console.error('Erreur lors de la création de l\'entreprise :', error);
        throw error;
    }
};

export const getEnterprise = async () => {
    try {
        const response = await axios.get(`${apiUrl}/enterprises` );
    
        if (response.status !== 200) {
            throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
        }
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