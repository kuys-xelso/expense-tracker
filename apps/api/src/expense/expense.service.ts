import { Injectable } from '@nestjs/common';
import { CreateExpenseInput } from './dto/create-expense.input';
import { UpdateExpenseInput } from './dto/update-expense.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Expense } from './entities/expense.entity';

type ExpenseMutationResponse = {
  success: boolean;
  message: string;
  expense: Expense;
};

type ExpenseDeleteResponse = {
  success: boolean;
  message: string;
};

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  private toExpenseEntity(expense: any): Expense {
    return {
      ...expense,
      amount: expense.amount.toString(),
    };
  }

  async create(
    createExpenseInput: CreateExpenseInput,
    userId: string,
  ): Promise<ExpenseMutationResponse> {
    const category = await this.prisma.client.category.findFirst({
      where: {
        id: createExpenseInput.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error(
        'Category not found or you do not have permission to use it',
      );
    }

    const expense = await this.prisma.client.expenses.create({
      data: {
        userId,
        ...createExpenseInput,
      },
    });

    return {
      success: true,
      message: 'Expense created successfully.',
      expense: this.toExpenseEntity(expense),
    };
  }

  async findAll(userId: string): Promise<Expense[]> {
    const expenses = await this.prisma.client.expenses.findMany({
      where: { userId },
    });
    return expenses.map((expense) => this.toExpenseEntity(expense));
  }

  async findOne(id: string, userId: string): Promise<Expense | null> {
    const expense = await this.prisma.client.expenses.findFirst({
      where: { id, userId },
    });
    return expense ? this.toExpenseEntity(expense) : null;
  }

  async update(
    id: string,
    updateExpenseInput: UpdateExpenseInput,
    userId: string,
  ): Promise<ExpenseMutationResponse> {
    const expense = await this.prisma.client.expenses.findFirst({
      where: { id, userId },
    });

    if (!expense) {
      throw new Error(
        'Expense not found or you do not have permission to update it',
      );
    }

    const updatedExpense = await this.prisma.client.expenses.update({
      where: { id },
      data: updateExpenseInput,
    });

    return {
      success: true,
      message: 'Expense updated successfully.',
      expense: this.toExpenseEntity(updatedExpense),
    };
  }

  async remove(id: string, userId: string): Promise<ExpenseDeleteResponse> {
    const expense = await this.prisma.client.expenses.findFirst({
      where: { id, userId },
    });

    if (!expense) {
      throw new Error(
        'Expense not found or you do not have permission to delete it',
      );
    }

    await this.prisma.client.expenses.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Expense deleted successfully.',
    };
  }
}
