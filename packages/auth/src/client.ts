import { createAuthClient } from "better-auth/react";

export type RepoAuthClient = ReturnType<typeof createAuthClient>;

export const createRepoAuthClient = (baseURL: string): RepoAuthClient =>
  createAuthClient({
    baseURL,
    basePath: "/api/auth",
  });

export const authClient: RepoAuthClient =
  createRepoAuthClient("http://localhost:3001");
