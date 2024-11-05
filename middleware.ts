import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/signup(.*)",
  "/login",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();
  if (!isPublicRoute(request) && !userId) {
    const url = request.nextUrl.clone(); // Clone the current URL
    url.pathname = "/login"; // Set the pathname to absolute "/login"
    return NextResponse.redirect(url); // Use absolute URL for the redirect
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
