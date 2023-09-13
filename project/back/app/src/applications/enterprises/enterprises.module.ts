import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { enterpriseModel } from 'src/core/enterprises/enterprise.entity';
import { EnterprisesDomain } from './enterprises.domain';

@Module({
  providers: [EnterprisesService, enterpriseModel, EnterprisesDomain],
  controllers: [EnterprisesController]
})
export class EnterprisesModule {}
