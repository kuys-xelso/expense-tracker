import { InputType, Field } from '@nestjs/graphql';
import { DecimalScalar } from 'src/common/scalars/decimal.scalar';

@InputType()
export class CreateExpenseInput {
  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => DecimalScalar)
  amount!: string;

  @Field(() => String)
  categoryId!: string;
}
