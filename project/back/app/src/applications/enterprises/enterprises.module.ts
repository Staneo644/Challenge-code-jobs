import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { enterpriseModel } from 'src/core/enterprises/enterprise.entity';

@Module({
  providers: [EnterprisesService, enterpriseModel],
  controllers: [EnterprisesController]
})
export class EnterprisesModule {}
