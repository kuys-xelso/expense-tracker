import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { IncomeCategoryService } from './income-category.service';
import { IncomeCategory } from './entities/income-category.entity';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';
import { Session } from '@thallesp/nestjs-better-auth';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class IncomeCategoryResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => IncomeCategory)
  category!: IncomeCategory;
}

@ObjectType()
class IncomeCategoryMessageResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@Resolver(() => IncomeCategory)
export class IncomeCategoryResolver {
  constructor(private readonly incomeCategoryService: IncomeCategoryService) {}

  @Mutation(() => IncomeCategoryResponse)
  createIncomeCategory(
    @Args('createIncomeCategoryInput')
    createIncomeCategoryInput: CreateIncomeCategoryInput,
    @Session() session: any,
  ) {
    return this.incomeCategoryService.create(
      createIncomeCategoryInput,
      session.user.id,
    );
  }

  @Query(() => [IncomeCategory], { name: 'incomeCategories' })
  findAllIncomeCategories(@Session() session: any) {
    return this.incomeCategoryService.findAll(session.user.id);
  }

  @Query(() => IncomeCategory, { name: 'incomeCategory', nullable: true })
  findOneIncomeCategory(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.incomeCategoryService.findOne(id, session.user.id);
  }

  @Mutation(() => IncomeCategoryResponse)
  updateIncomeCategory(
    @Args('updateIncomeCategoryInput')
    updateIncomeCategoryInput: UpdateIncomeCategoryInput,
    @Session() session: any,
  ) {
    return this.incomeCategoryService.update(
      updateIncomeCategoryInput.id,
      updateIncomeCategoryInput,
      session.user.id,
    );
  }

  @Mutation(() => IncomeCategoryMessageResponse)
  removeIncomeCategory(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.incomeCategoryService.remove(id, session.user.id);
  }
}
