import "dotenv/config";
import { PrismaClient } from "./generated/index.js";

export * from "./generated/index.js";
export { PrismaClient } from "./generated/index.js";

const globalForPrisma = globalThis as unknown as {
  __repoDatabasePrisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.__repoDatabasePrisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__repoDatabasePrisma = prisma;
}
