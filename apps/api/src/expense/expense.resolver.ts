import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { ObjectType, Field } from '@nestjs/graphql';
import { Session } from '@thallesp/nestjs-better-auth';

@ObjectType()
class ExpenseResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => Expense)
  expense!: Expense;
}

@ObjectType()
class ExpenseMessageResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@Resolver(() => Expense)
export class ExpenseResolver {
  constructor(private readonly expenseService: ExpenseService) {}

  @Mutation(() => ExpenseResponse)
  createExpense(
    @Args('createExpenseInput') createExpenseInput: CreateExpenseInput,
    @Session() session: any,
  ): Promise<ExpenseResponse> {
    return this.expenseService.create(createExpenseInput, session.user.id);
  }

  @Query(() => [Expense], { name: 'expenses' })
  findAll(@Session() session: any): Promise<Expense[]> {
    return this.expenseService.findAll(session.user.id);
  }

  @Query(() => Expense, { name: 'expense', nullable: true })
  findOne(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ): Promise<Expense | null> {
    return this.expenseService.findOne(id, session.user.id);
  }

  @Mutation(() => ExpenseResponse)
  updateExpense(
    @Args('updateExpenseInput') updateExpenseInput: UpdateExpenseInput,
    @Session() session: any,
  ): Promise<ExpenseResponse> {
    return this.expenseService.update(
      updateExpenseInput.id,
      updateExpenseInput,
      session.user.id,
    );
  }

  @Mutation(() => ExpenseMessageResponse)
  removeExpense(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ): Promise<ExpenseMessageResponse> {
    return this.expenseService.remove(id, session.user.id);
  }
}
