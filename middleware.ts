import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  publicRoutes: ["/signup", "/login"],

  afterAuth(auth, req) {
    const { userId, orgRole } = auth;
    const url = req.nextUrl.clone();
    const path = url.pathname;

    if (!userId && path === "/signup") {
      return NextResponse.next();
    }

    if (!userId && path !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    if (userId && path === "/login" && orgRole === "org:admin") {
      url.pathname = "/dashboard";
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

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
