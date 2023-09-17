import axios from 'axios';
import { EmployerData, apiUrl, jobData, jobDataId } from './global';

export const getEmployer = async (email:string) => {
  console.log("searching for employer " + email)
 try {
  const response = await axios.get(`${apiUrl}/employers/${email}`);
    
    if (response.status !== 200) {
      return null;
    }
    console.log("found employer " + email + " : " + response.data)
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

  
  export const createJob = async (employerEmail:string, jobData:jobData) => {
    try {
      fetch(`${apiUrl}/employers/${employerEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Assurez-vous de spécifier le type de contenu JSON
        },
        body: JSON.stringify(jobData),

      })

      //const response = await axios.post(`${apiUrl}/employers/${employerEmail}`, jobData);
      // console.log("created job for " + employerEmail + " : " + response.data)
      // return response.data;
    } catch (error) {
      console.error('Erreur lors de la création de l\'emploi', error);
      throw error;
    }
  };
  
  // Fonction pour récupérer tous les emplois d'un employeur spécifique
  export const getEmployerJobs = async (employerEmail:string):Promise<jobDataId[]> => {
    console.log("searching for jobs of " + employerEmail)
    try {
      const response = await axios.get(`${apiUrl}/employers/jobs/${employerEmail}`);
      console.log("found jobs of " + employerEmail + " : " + response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les emplois de l\'employeur', error);
      throw error;
    }
  };
  
  // Fonction pour supprimer un emploi d'un employeur spécifique par ID
  export const deleteJob = async (employerEmail:string, jobId:string) => {
    console.log("deleting job " + jobId + " of " + employerEmail)
    try {
      const response = await axios.delete(`${apiUrl}/employers/${employerEmail}/${jobId}`);
      console.log("deleted job " + jobId + " of " + employerEmail + " : " + response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'emploi', error);
      throw error;
    }
  };