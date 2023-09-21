import axios from 'axios';
import { jobSeekerData, apiUrl, jobDataId } from './global';
import { promises } from 'dns';



export const getJobs = async (email:string):Promise<jobDataId[]> => {
  console.log("searching for jobs " + email)
  try {
    const response = await axios.get(`${apiUrl}/jobseekers/jobs/${email}`);
    console.log("found jobs " + email + " : " + response.data)
    return response.data;
  }
  catch(error){
    console.error('Erreur lors de la récupération de tous les emplois :', error);
    throw error;
  };
}

export const getJobSeeker = async (email:string) : Promise<jobSeekerData | null> => {
  console.log("searching for job seeker " + email)
 try {
  const response = await axios.get(`${apiUrl}/jobseekers/${email}`);
    
    if (response.status !== 200) {
      return null;
    }
    console.log("found job seeker " + email + " : " + response.data)

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
  } 
 };

 export const addSeeingJob = async (email:string, jobData: string) => {
  console.log("adding job " + jobData + " of " + email)
  try {
    const response = await axios.post(`${apiUrl}/jobs/${email}`, {jobData}
    );
    console.log('Response:')
    console.log(response.data);
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'emploi', error);
    throw error;
  }
};
    