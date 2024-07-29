import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import getRawBody from "raw-body";
import { NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/stripe/upgrade(.*)",
]);
export default clerkMiddleware(async (auth, request) => {
  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/api/stripe/webhook"
  ) {
    (request as any).rawBody = await getRawBody(request.body as any);
  }
  if (isProtectedRoute(request)) auth().protect();
});
export async function middleware(request: NextRequest) {
  if (
    request.method === "POST" &&
    request.nextUrl.pathname === "/api/stripe/webhook"
  ) {
    (request as any).rawBody = await getRawBody(request.body as any);
    return NextResponse.next();
  }
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(trpc)(.*)",
  ],
};
