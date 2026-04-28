import { ObjectType, Field } from '@nestjs/graphql';
import { DecimalScalar } from '../../common/scalars/decimal.scalar';

@ObjectType()
export class Income {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => DecimalScalar)
  amount!: string;

  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  userId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
