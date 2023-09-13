import axios from 'axios';
import { EmployerData, apiUrl } from './global';


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