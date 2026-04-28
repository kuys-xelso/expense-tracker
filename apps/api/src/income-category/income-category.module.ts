import { Module } from '@nestjs/common';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategoryResolver } from './income-category.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [IncomeCategoryResolver, IncomeCategoryService],
})
export class IncomeCategoryModule {}
