import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './expense-category.service';
import { Category } from './entities/expense-category.entity';
import { CreateCategoryInput } from './dto/create-expense-category.input';
import { UpdateCategoryInput } from './dto/update-expense-category.input';
import { Session } from '@thallesp/nestjs-better-auth';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class CategoryResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => Category)
  category!: Category;
}

@ObjectType()
class CategoryMessageResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryResponse)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    @Session() session: any,
  ) {
    return this.categoryService.create(createCategoryInput, session.user.id);
  }

  @Query(() => [Category], { name: 'category' })
  findAll(@Session() session: any) {
    return this.categoryService.findAll(session.user.id);
  }

  @Query(() => Category, { name: 'category' })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.categoryService.findOne(id, session.user.id);
  }

  @Mutation(() => CategoryResponse)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    @Session() session: any,
  ) {
    return this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
      session.user.id,
    );
  }

  @Mutation(() => CategoryMessageResponse)
  removeCategory(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ) {
    return this.categoryService.remove(id, session.user.id);
  }
}
