import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  image?: string;
}
