import axios from 'axios';
import { apiUrl, jobData, jobDataId } from './global';

export const findAllJobs = async (): Promise<jobData[]> => {
  console.log("searching for all jobs")
    try {
      const response = await axios.get(`${apiUrl}/findAllJobs`);
      console.log("found all jobs : " + response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération de tous les emplois', error);
      throw error;
    }
  };
  
  // Fonction pour créer un emploi
  
  // Fonction pour mettre à jour un emploi
  export const updateJob = async (jobId:string, jobData:jobData) => {
    console.log("updating job " + jobId)
    try {
      const response = await axios.put(`${apiUrl}/jobs/${jobId}`, jobData);
      console.log("updated job " + jobId +  " : " + response.data)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'emploi', error);
      throw error;
    }
  };
  
  // Fonction pour supprimer un emploi