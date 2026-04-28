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

type IncomeDashboardCategoryTotal = {
  categoryId: string;
  categoryName: string;
  totalAmount: string;
  incomeCount: number;
};

type IncomeDashboardData = {
  totalAmount: string;
  currentMonthAmount: string;
  totalIncomes: number;
  currentMonthIncomes: number;
  recentIncomes: Income[];
  incomesByCategory: IncomeDashboardCategoryTotal[];
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

  async getDashboard(userId: string): Promise<IncomeDashboardData> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [allIncomes, monthIncomes, recentIncomes] = await Promise.all([
      this.prisma.client.income.findMany({
        where: { userId },
        include: { category: true },
      }),
      this.prisma.client.income.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfMonth,
          },
        },
      }),
      this.prisma.client.income.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ]);

    const totalAmount = allIncomes.reduce(
      (sum, income) => sum + Number(income.amount),
      0,
    );
    const currentMonthAmount = monthIncomes.reduce(
      (sum, income) => sum + Number(income.amount),
      0,
    );

    const categoryAggregation = allIncomes.reduce<
      Record<string, IncomeDashboardCategoryTotal>
    >((acc, income) => {
      const existing = acc[income.categoryId];
      const amount = Number(income.amount);
      if (!existing) {
        acc[income.categoryId] = {
          categoryId: income.categoryId,
          categoryName: income.category.name,
          totalAmount: amount.toFixed(2),
          incomeCount: 1,
        };
        return acc;
      }

      acc[income.categoryId] = {
        ...existing,
        totalAmount: (Number(existing.totalAmount) + amount).toFixed(2),
        incomeCount: existing.incomeCount + 1,
      };
      return acc;
    }, {});

    const incomesByCategory: IncomeDashboardCategoryTotal[] =
      Object.values(categoryAggregation);

    return {
      totalAmount: totalAmount.toFixed(2),
      currentMonthAmount: currentMonthAmount.toFixed(2),
      totalIncomes: allIncomes.length,
      currentMonthIncomes: monthIncomes.length,
      recentIncomes: recentIncomes.map((income) => this.toIncomeEntity(income)),
      incomesByCategory: incomesByCategory.sort(
        (a, b) => Number(b.totalAmount) - Number(a.totalAmount),
      ),
    };
  }
}
