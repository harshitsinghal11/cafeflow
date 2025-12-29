import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Check if user is trying to access "/admin"
  // We exclude "/admin/login" so they don't get stuck in a redirect loop
  if (path.startsWith("/admin") && !path.startsWith("/admin/login")) {
    
    // 2. Look for the cookie
    const adminSession = request.cookies.get("admin_session");

    // 3. If no cookie is found, force redirect to Login
    if (!adminSession) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

// CONFIG: This tells Next.js exactly which routes to run this check on
export const config = {
  // Matches "/admin" AND "/admin/anything"
  matcher: ["/admin", "/admin/:path*"], 
};