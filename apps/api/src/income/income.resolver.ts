import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { IncomeService } from './income.service';
import { Income } from './entities/income.entity';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { ObjectType, Field } from '@nestjs/graphql';
import { Session } from '@thallesp/nestjs-better-auth';
import { DecimalScalar } from '../common/scalars/decimal.scalar';

@ObjectType()
class IncomeResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;

  @Field(() => Income)
  income!: Income;
}

@ObjectType()
class IncomeMessageResponse {
  @Field(() => Boolean)
  success!: boolean;

  @Field(() => String)
  message!: string;
}

@ObjectType()
class IncomeDashboardCategoryTotal {
  @Field(() => String)
  categoryId!: string;

  @Field(() => String)
  categoryName!: string;

  @Field(() => DecimalScalar)
  totalAmount!: string;

  @Field(() => Int)
  incomeCount!: number;
}

@ObjectType()
class IncomeDashboardData {
  @Field(() => DecimalScalar)
  totalAmount!: string;

  @Field(() => DecimalScalar)
  currentMonthAmount!: string;

  @Field(() => Int)
  totalIncomes!: number;

  @Field(() => Int)
  currentMonthIncomes!: number;

  @Field(() => [Income])
  recentIncomes!: Income[];

  @Field(() => [IncomeDashboardCategoryTotal])
  incomesByCategory!: IncomeDashboardCategoryTotal[];
}

@Resolver(() => Income)
export class IncomeResolver {
  constructor(private readonly incomeService: IncomeService) {}

  @Mutation(() => IncomeResponse)
  createIncome(
    @Args('createIncomeInput') createIncomeInput: CreateIncomeInput,
    @Session() session: any,
  ): Promise<IncomeResponse> {
    return this.incomeService.create(createIncomeInput, session.user.id);
  }

  @Query(() => [Income], { name: 'incomes' })
  findAllIncomes(@Session() session: any): Promise<Income[]> {
    return this.incomeService.findAll(session.user.id);
  }

  @Query(() => IncomeDashboardData, { name: 'incomeDashboard' })
  incomeDashboard(@Session() session: any): Promise<IncomeDashboardData> {
    return this.incomeService.getDashboard(session.user.id);
  }

  @Query(() => Income, { name: 'income', nullable: true })
  findOneIncome(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ): Promise<Income | null> {
    return this.incomeService.findOne(id, session.user.id);
  }

  @Mutation(() => IncomeResponse)
  updateIncome(
    @Args('updateIncomeInput') updateIncomeInput: UpdateIncomeInput,
    @Session() session: any,
  ): Promise<IncomeResponse> {
    return this.incomeService.update(
      updateIncomeInput.id,
      updateIncomeInput,
      session.user.id,
    );
  }

  @Mutation(() => IncomeMessageResponse)
  removeIncome(
    @Args('id', { type: () => String }) id: string,
    @Session() session: any,
  ): Promise<IncomeMessageResponse> {
    return this.incomeService.remove(id, session.user.id);
  }
}
