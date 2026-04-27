import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseResolver } from './expense.resolver';
import { DecimalScalar } from '../common/scalars/decimal.scalar';

@Module({
  providers: [ExpenseResolver, ExpenseService, DecimalScalar],
})
export class ExpenseModule {}
