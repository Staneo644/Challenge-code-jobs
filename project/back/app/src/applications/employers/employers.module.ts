
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployersController } from './employers.controller';
import { EmployersService } from './employers.service';
import { Employer, EmployerSchema } from '../../core/employers/employer.entity';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Employer', schema: EmployerSchema }])],
  controllers: [EmployersController],
  providers: [EmployersService],
})
export class EmployersModule {}