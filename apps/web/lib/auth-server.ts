import { cookies } from "next/headers";

type BetterAuthSession = {
  user?: unknown;
  session?: unknown;
};

const AUTH_SERVER_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001";

function normalizeSession(payload: unknown): BetterAuthSession | null {
  if (!payload || typeof payload !== "object") return null;

  const maybePayload = payload as Record<string, unknown>;

  if (
    maybePayload.user &&
    typeof maybePayload.user === "object" &&
    maybePayload.session &&
    typeof maybePayload.session === "object"
  ) {
    return {
      user: maybePayload.user,
      session: maybePayload.session,
    };
  }

  if (
    maybePayload.data &&
    typeof maybePayload.data === "object" &&
    (maybePayload.data as Record<string, unknown>).user &&
    (maybePayload.data as Record<string, unknown>).session
  ) {
    const data = maybePayload.data as Record<string, unknown>;
    return {
      user: data.user,
      session: data.session,
    };
  }

  return null;
}

export async function getServerSession() {
  const cookieHeader = (await cookies()).toString();

  if (!cookieHeader) return null;

  const response = await fetch(`${AUTH_SERVER_URL}/api/auth/get-session`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as unknown;
  return normalizeSession(payload);
}

export async function hasServerSession() {
  const session = await getServerSession();
  return Boolean(session?.session && session?.user);
}

