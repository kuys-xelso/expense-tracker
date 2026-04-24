import { Injectable } from '@nestjs/common';
import { UpdateProfileInput } from './dto/update-profile';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async me(id: string) {
    return this.prisma.client.user.findUnique({
      where: { id },
    });
  }

  // Allows the user to update their own name or avatar image
  async updateProfile(id: string, updateProfileInput: UpdateProfileInput) {
    return this.prisma.client.user.update({
      where: { id },
      data: updateProfileInput,
    });
  }
}
