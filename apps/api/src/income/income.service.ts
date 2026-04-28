import { Injectable } from '@nestjs/common';
import { CreateIncomeInput } from './dto/create-income.input';
import { UpdateIncomeInput } from './dto/update-income.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Income } from './entities/income.entity';

type IncomeMutationResponse = {
  success: boolean;
  message: string;
  income: Income;
};

type IncomeDeleteResponse = {
  success: boolean;
  message: string;
};

@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  private toIncomeEntity(income: any): Income {
    return {
      ...income,
      amount: income.amount.toString(),
    };
  }

  async create(
    createIncomeInput: CreateIncomeInput,
    userId: string,
  ): Promise<IncomeMutationResponse> {
    const category = await this.prisma.client.incomeCategory.findFirst({
      where: {
        id: createIncomeInput.categoryId,
        userId,
      },
    });

    if (!category) {
      throw new Error(
        'Income category not found or you do not have permission to use it',
      );
    }

    const income = await this.prisma.client.income.create({
      data: {
        userId,
        ...createIncomeInput,
      },
    });

    return {
      success: true,
      message: 'Income created successfully.',
      income: this.toIncomeEntity(income),
    };
  }

  async findAll(userId: string): Promise<Income[]> {
    const incomes = await this.prisma.client.income.findMany({
      where: { userId },
    });
    return incomes.map((income) => this.toIncomeEntity(income));
  }

  async findOne(id: string, userId: string): Promise<Income | null> {
    const income = await this.prisma.client.income.findFirst({
      where: { id, userId },
    });
    return income ? this.toIncomeEntity(income) : null;
  }

  async update(
    id: string,
    updateIncomeInput: UpdateIncomeInput,
    userId: string,
  ): Promise<IncomeMutationResponse> {
    const income = await this.prisma.client.income.findFirst({
      where: { id, userId },
    });

    if (!income) {
      throw new Error(
        'Income not found or you do not have permission to update it',
      );
    }

    const updatedIncome = await this.prisma.client.income.update({
      where: { id },
      data: updateIncomeInput,
    });

    return {
      success: true,
      message: 'Income updated successfully.',
      income: this.toIncomeEntity(updatedIncome),
    };
  }

  async remove(id: string, userId: string): Promise<IncomeDeleteResponse> {
    const income = await this.prisma.client.income.findFirst({
      where: { id, userId },
    });

    if (!income) {
      throw new Error(
        'Income not found or you do not have permission to delete it',
      );
    }

    await this.prisma.client.income.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Income deleted successfully.',
    };
  }
}
