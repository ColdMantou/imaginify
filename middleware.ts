import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// sign-up, sign-up and /api/webhook/clerk will be public routes
// the rest will be protected
const isPublicRoute = createRouteMatcher([
  "/((?!sign-in|sign-up|api/webhook/clerk).*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Don't run middleware on static files
    "/", // Run middleware on index page
    "/(api|trpc)(.*)",
  ], // Run middleware on API routes
};