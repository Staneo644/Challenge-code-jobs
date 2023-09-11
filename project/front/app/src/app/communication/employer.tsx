import axios from 'axios';
import { EmployerData, apiUrl } from './global';


export const createEmployer = async (employerData:EmployerData) => {
    try {
      const response = await axios.post(`${apiUrl}/employers`, employerData );
  
      if (response.status !== 201) {
        throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
      }
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'employeur :', error);
      throw error;
    }
  };


export const getEmployer = async (email:string) => {
  axios.get(`${apiUrl}/employers/${email}`)
    .then((response) => {
      if (response.status !== 200) {
        return(null)
      }
      console.log(response.data);
      return ({email: response.data.email, 
        name: response.data.name, 
        surname: response.data.surname, 
        enterprise_name: response.data.enterprise_name})})
    
    .catch((error) => {
      console.error('Erreur lors de la vérification de l\'employeur :', error);
      console.error(error);
    });
  }