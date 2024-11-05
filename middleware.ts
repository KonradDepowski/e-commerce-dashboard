import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/signup(.*)", "/login"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (!isPublicRoute(request) && !userId) {
    if (path !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } else if (userId) {
    if (path === "/login" || path === "/") {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
