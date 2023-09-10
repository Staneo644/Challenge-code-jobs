import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Employer } from '../../core/employers/employer.entity';
import { InjectModel } from '@nestjs/mongoose';
import { JobsService } from '../jobs/jobs.service';

@Injectable()
export class EmployersService {
    constructor(private readonly jobsService: JobsService) {}
  
    async createJob(employerId: string, jobData: any) {
      // Validez et créez un nouvel emploi
      const job = await this.jobsService.createJob(employerId, jobData);
      // Enregistrez l'emploi pour l'employeur
      // Vous pouvez implémenter cette logique ici
      return job;
    }
  
    async updateJob(employerId: string, jobId: string, jobData: any) {
      // Validez et mettez à jour l'emploi
      const job = await this.jobsService.updateJob(employerId, jobId, jobData);
      // Votre logique de mise à jour ici
      return job;
    }
  
    async deleteJob(employerId: string, jobId: string) {
      // Supprimez l'emploi
      await this.jobsService.deleteJob(employerId, jobId);
      // Votre logique de suppression ici
    }
  }