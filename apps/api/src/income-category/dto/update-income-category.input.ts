import { CreateIncomeCategoryInput } from './create-income-category.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateIncomeCategoryInput extends PartialType(
  CreateIncomeCategoryInput,
) {
  @Field(() => String)
  id!: string;
}
