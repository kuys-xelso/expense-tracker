import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../prisma/prisma.service';
@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput, userId: string) {
    const category = await this.prisma.client.category.create({
      data: {
        userId,
        ...createCategoryInput,
      },
    });
    return {
      success: true,
      message: 'Category created successfully.',
      category,
    };
  }

  async findAll(userId: string) {
    return this.prisma.client.category.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    return this.prisma.client.category.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
    userId: string,
  ) {
    const category = await this.prisma.client.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new Error(
        'Category not found or you do not have permission to update it',
      );
    }

    const updatedCategory = await this.prisma.client.category.update({
      where: { id },
      data: updateCategoryInput,
    });
    return {
      success: true,
      message: 'Category updated successfully.',
      category: updatedCategory,
    };
  }

  async remove(id: string, userId: string) {
    const category = await this.prisma.client.category.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!category) {
      throw new Error(
        'Category not found or you do not have permission to delete it',
      );
    }

    await this.prisma.client.category.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Category deleted successfully.',
    };
  }
}
