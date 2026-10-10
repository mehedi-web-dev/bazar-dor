import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const sessionCookie = getSessionCookie(request);

  const publicRoutes = ["/", "/sign-in", "/sign-up"];

  const isPublicRoute = publicRoutes.includes(pathname);

  
  if (!sessionCookie && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

 
  if (sessionCookie && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
