import { Module } from '@nestjs/common';
import { CategoryService } from './expense-category.service';
import { CategoryResolver } from './expense-category.resolver';

@Module({
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
