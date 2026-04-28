import { Injectable } from '@nestjs/common';
import { CreateIncomeCategoryInput } from './dto/create-income-category.input';
import { UpdateIncomeCategoryInput } from './dto/update-income-category.input';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IncomeCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateIncomeCategoryInput, userId: string) {
    const category = await this.prisma.client.incomeCategory.create({
      data: {
        userId,
        ...createCategoryInput,
      },
    });

    return {
      success: true,
      message: 'Income category created successfully.',
      category,
    };
  }

  async findAll(userId: string) {
    return this.prisma.client.incomeCategory.findMany({
      where: { userId },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.client.incomeCategory.findFirst({
      where: { id, userId },
    });
  }

  async update(
    id: string,
    updateCategoryInput: UpdateIncomeCategoryInput,
    userId: string,
  ) {
    const category = await this.prisma.client.incomeCategory.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error(
        'Income category not found or you do not have permission to update it',
      );
    }

    const updatedCategory = await this.prisma.client.incomeCategory.update({
      where: { id },
      data: updateCategoryInput,
    });

    return {
      success: true,
      message: 'Income category updated successfully.',
      category: updatedCategory,
    };
  }

  async remove(id: string, userId: string) {
    const category = await this.prisma.client.incomeCategory.findFirst({
      where: { id, userId },
    });

    if (!category) {
      throw new Error(
        'Income category not found or you do not have permission to delete it',
      );
    }

    await this.prisma.client.incomeCategory.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Income category deleted successfully.',
    };
  }
}
