import { CreateIncomeInput } from './create-income.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeInput extends PartialType(CreateIncomeInput) {
  @Field(() => String)
  id!: string;
}
