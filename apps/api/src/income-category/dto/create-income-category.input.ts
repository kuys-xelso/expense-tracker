import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIncomeCategoryInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  iconName!: string;
}
