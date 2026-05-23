export const adminSessionCookie = "neospace_admin_session";

export function getAdminSessionToken() {
  if (process.env.NODE_ENV === "production") {
    return process.env.ADMIN_SESSION_TOKEN || "";
  }

  return process.env.ADMIN_SESSION_TOKEN || "neospace-local-admin-session";
}

export function getAdminPassword() {
  if (process.env.NODE_ENV === "production") {
    return process.env.ADMIN_PASSWORD || "";
  }

  return process.env.ADMIN_PASSWORD || "admin123";
}
