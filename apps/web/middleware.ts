import { NextResponse, type NextRequest } from "next/server";

const AUTH_SERVER_URL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3001";

function hasValidSessionPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return false;

  const record = payload as Record<string, unknown>;

  if (
    record.user &&
    typeof record.user === "object" &&
    record.session &&
    typeof record.session === "object"
  ) {
    return true;
  }

  if (record.data && typeof record.data === "object") {
    const data = record.data as Record<string, unknown>;
    return Boolean(data.user && data.session);
  }

  return false;
}

async function isAuthenticated(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return false;

  try {
    const response = await fetch(`${AUTH_SERVER_URL}/api/auth/get-session`, {
      method: "GET",
      headers: {
        cookie: cookieHeader,
      },
      cache: "no-store",
    });

    if (!response.ok) return false;

    const payload = (await response.json()) as unknown;
    return hasValidSessionPayload(payload);
  } catch (error) {
    console.error("Middleware fetch failed. Is the API running on", AUTH_SERVER_URL, "?", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authed = await isAuthenticated(request);

  // Since we removed /dashboard from the URL, we need to protect the actual paths
  const protectedRoutes = ["/overview", "/analytics", "/categories"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !authed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((pathname.startsWith("/login") || pathname.startsWith("/signup")) && authed) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview/:path*", "/analytics/:path*", "/categories/:path*", "/login", "/signup"],
};
