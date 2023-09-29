import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { EnterprisesDomain } from './enterprises.domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './enterprise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise])],
  providers: [EnterprisesService, EnterprisesDomain],
  controllers: [EnterprisesController],
})
export class EnterprisesModule {}
