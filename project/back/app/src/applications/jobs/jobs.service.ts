import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../../core/jobs/job.entity'; // Importez votre entité Job définie dans le core


@Injectable()
export class JobsService {
  constructor(@InjectModel('Job') private readonly jobModel: Model<Job>) {}

  async createJob(employerId: string, jobData: any): Promise<Job> {
    // Créez une nouvelle instance de Job avec les données fournies
    const job = new this.jobModel({
      ...jobData,
      employer_id: employerId, // Assurez-vous que l'ID de l'employeur est lié à l'emploi
    });
    return await job.save();
  }

  async updateJob(employerId: string, jobId: string, jobData: any): Promise<Job> {
    // Recherchez l'emploi dans la base de données
    const job = await this.findJobById(jobId);

    // Assurez-vous que l'employeur correspond à celui spécifié dans les données
    if (job.employer_id.toString() !== employerId) {
      throw new NotFoundException('Job not found for the specified employer.');
    }

    // Mettez à jour les propriétés de l'emploi avec les nouvelles données
    Object.assign(job, jobData);

    // Enregistrez les modifications
    return await job.save();
  }

  async deleteJob(employerId: string, jobId: string): Promise<void> {
    const job = await this.findJobById(jobId);

    if (job.employer_id.toString() !== employerId) {
        throw new NotFoundException('Job not found for the specified employer.');
    }

    await this.jobModel.deleteOne({ _id: jobId }).exec();
    }

  async findJobById(jobId: string): Promise<Job> {
    try {
      return await this.jobModel.findById(jobId).exec();
    } catch (error) {
      throw new NotFoundException('Job not found.');
    }
  }

  async findAllJobs(): Promise<Job[]> {
    return await this.jobModel.find().exec();
  }

  // Vous pouvez ajouter d'autres méthodes de recherche et de filtrage des emplois en fonction de vos besoins.
}