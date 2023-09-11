import { createContext, useContext } from 'react';

export interface ProfilData {
    name: string;
    surname: string;
    email: string;
    hasEnterprise: boolean;
    enterpriseName: string;
  }

const ProfilContext = createContext<ProfilData | undefined> (undefined);

export const changeContext = (profilData:ProfilData) => {
    ProfilContext.Provider.value = profilData;
}

export const useAppContext = () => {
    const context = useContext(ProfilContext);
    if (context === undefined) {
      throw new Error('useAppContext doit être utilisé dans un composant enveloppé par AppContextProvider');
    }
    return context;
};
  

export default ProfilContext;