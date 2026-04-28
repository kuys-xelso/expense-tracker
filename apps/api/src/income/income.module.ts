import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeResolver } from './income.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IncomeResolver, IncomeService],
})
export class IncomeModule {}
