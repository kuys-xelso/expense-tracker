import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@repo/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public client: PrismaClient;

  constructor() {
    const globalForPrisma = globalThis as unknown as {
      __apiPrisma: PrismaClient | undefined;
    };

    this.client =
      globalForPrisma.__apiPrisma ??
      new PrismaClient({
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
      });

    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.__apiPrisma = this.client;
    }
  }

  async onModuleInit() {
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
