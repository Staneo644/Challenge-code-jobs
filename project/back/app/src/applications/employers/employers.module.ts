
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { EmployerSchema } from '../../core/employers/employer.entity';
import { JobsService } from '../jobs/jobs.service';
import { EmployersDomain } from './employers.domain';
import { EnterprisesService } from '../enterprises/enterprises.service';
import { EnterprisesDomain } from '../enterprises/enterprises.domain';
import { JobsDomain } from '../jobs/jobs.domain';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employer', schema: EmployerSchema }]),

  MulterModule.register({
    dest: './public/images', // Où les images seront stockées temporairement
  }),
],
  controllers: [EmployersController],
  providers: [EmployersService, EmployersDomain, EnterprisesService, EnterprisesDomain,JobsDomain, JobsService],
})
export class EmployersModule {}