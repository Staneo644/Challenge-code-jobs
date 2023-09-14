import axios from 'axios';
import { EmployerData, apiUrl, jobData } from './global';

export const getEmployer = async (email:string) => {
 try {
  const response = await axios.get(`${apiUrl}/employers/${email}`);
    
    if (response.status !== 200) {
      return null;
    }

    if (response.data === "") {
      return null;
    }
    
    const data: EmployerData = {
      email: response.data.email,
      name: response.data.name,
      surname: response.data.surname,
      enterprise_name: response.data.enterprise_name
    };
    
    return data;
 }
    
    catch(error){
      console.error('Erreur lors de la vérification de l\'employeur :', error);
      console.error(error);
      return(null)
    };
  }

  const createJob = async (employerEmail:string, jobData:jobData) => {
    try {
      const response = await axios.post(`${apiUrl}/${employerEmail}`, jobData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'emploi', error);
      throw error;
    }
  };
  
  // Fonction pour récupérer tous les emplois d'un employeur spécifique
  const getEmployerJobs = async (employerEmail:string) => {
    try {
      const response = await axios.get(`${apiUrl}/${employerEmail}/jobs`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les emplois de l\'employeur', error);
      throw error;
    }
  };
  
  // Fonction pour supprimer un emploi d'un employeur spécifique par ID
  const deleteJob = async (employerEmail:string, jobId:string) => {
    try {
      const response = await axios.delete(`${apiUrl}/${employerEmail}/${jobId}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'emploi', error);
      throw error;
    }
  };