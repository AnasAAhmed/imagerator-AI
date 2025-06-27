// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // const { userId } = await auth();
  // const { pathname } = req.nextUrl;

  // if (userId && pathname === "/") {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|$).*)",
    "/api/protected-route",
    "/api/user(.*)",
    "/trpc/(.*)",
  ],
};



