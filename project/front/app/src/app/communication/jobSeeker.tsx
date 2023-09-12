import axios from 'axios';
import { jobSeekerData, apiUrl } from './global';


export const createJobSeeker = async (JobSeekerData:jobSeekerData) => {
    try {
      const response = await axios.post(`${apiUrl}/jobseekers`, JobSeekerData );
  
      if (response.status !== 201) {
        throw new Error(`Erreur HTTP : ${response.status} - ${response.statusText}`);
      }
      console.log(response.data)
      if (response.data === "") {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Erreur lors de la création de l\'employeur :', error);
      throw error;
    }
  };


export const getJobSeeker = async (email:string) => {
 try {
  const response = await axios.get(`${apiUrl}/jobseekers/${email}`);
    
    if (response.status !== 200) {
      return null;
    }

    if (response.data === "") {
      return null;
    }
    
    const data: jobSeekerData = {
      email: response.data.email,
      name: response.data.name,
      surname: response.data.surname,
    };
    
    return data;
 }
    
    catch(error){
      console.error('Erreur lors de la vérification de l\'employeur :', error);
      console.error(error);
      return(null)
    };
  } 