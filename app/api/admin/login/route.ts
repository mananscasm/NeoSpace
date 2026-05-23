import { NextResponse, type NextRequest } from "next/server";
import { adminSessionCookie, getAdminPassword, getAdminSessionToken } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const from = String(formData.get("from") || "/admin");

  if (password !== getAdminPassword()) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "1");
    loginUrl.searchParams.set("from", from);
    return NextResponse.redirect(loginUrl, { status: 303 });
  }

  const response = NextResponse.redirect(new URL(from.startsWith("/admin") ? from : "/admin", request.url), {
    status: 303
  });

  response.cookies.set(adminSessionCookie, getAdminSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  return response;
}
