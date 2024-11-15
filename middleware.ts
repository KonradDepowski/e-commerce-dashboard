import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/signup", "/login"],

  afterAuth(auth, req) {
    const { userId, orgRole } = auth;
    const url = req.nextUrl.clone();
    const path = url.pathname;

    // Prevent redirect loops by bypassing redirects if already on login or signup
    if (!userId && path === "/signup") {
      return NextResponse.next(); // Allow access to /signup without redirecting
    }

    if (!userId && path !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    if (
      orgRole === "org:member" &&
      (path === "/login" || path === "/dashboard")
    ) {
      url.pathname = "/dashboard/products";
      return NextResponse.redirect(url);
    }

    if (userId && (path === "/login" || path === "/")) {
      url.pathname = "/dashboard/products";
      return NextResponse.redirect(url);
    }

    if (orgRole === "org:member" && path === "/dashboard/users") {
      url.pathname = "/dashboard/products";
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Default to proceed if none of the conditions match
  },
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
