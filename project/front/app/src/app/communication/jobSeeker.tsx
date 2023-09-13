import axios from 'axios';
import { jobSeekerData, apiUrl } from './global';


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