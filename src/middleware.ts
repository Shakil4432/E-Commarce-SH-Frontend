import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthServices";

const AuthRoutes = ["/login", "/register"];
type TRole = keyof typeof roleBasedPrivateRoutes;

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/],
  user: [/^\/user/, /^\/create-product/],
};
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  if (currentUser?.role && roleBasedPrivateRoutes[currentUser?.role as TRole]) {
    const routes = roleBasedPrivateRoutes[currentUser?.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",

    "/create-product",
    "/admin",
    "/admin/:page",
    "/user",
    "/user/:page",
  ],
};
