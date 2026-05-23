import { NextResponse, type NextRequest } from "next/server";
import { adminSessionCookie, getAdminSessionToken } from "@/lib/admin-auth";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get(adminSessionCookie)?.value === getAdminSessionToken();

  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin"]
};
