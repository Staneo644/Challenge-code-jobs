import { Enterprise } from '../../core/enterprises/enterprise.entity';

export interface IEnterprisesDomain {

    createEnterprise(enterpriseData: Enterprise): Promise<Enterprise | null>;
    
    getEnterprises(): Promise<Enterprise[]>;
    
    updateEnterprise(title: string, updateData: Partial<Enterprise>): Promise<Enterprise>;
    
    getEnterpriseByTitle(title: string): Promise<Enterprise>;
    
    getEnterprisesByEmail(email: string): Promise<Enterprise[]>;
    
    updateEnterpriseByEmail(email: string, newEmail: string): Promise<boolean>;
    
    isEnterprise(title: string): Promise<boolean>;
    
    deleteEnterpriseTitle(title: string): Promise<void>;
    
    deleteEnterprise(email: string): Promise<void>;
}