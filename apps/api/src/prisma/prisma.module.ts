import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // This makes it available everywhere without importing it in every module
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
