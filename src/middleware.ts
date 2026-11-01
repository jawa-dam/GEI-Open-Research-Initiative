export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/submissions/:path*",
    "/review/:path*",
    "/admin/:path*",
  ],
};
