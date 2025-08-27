import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CITIES } from "@/lib/utils";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/weather") {
    const firstCity = CITIES[0].name.toLowerCase();
    return NextResponse.redirect(new URL(`/weather/${firstCity}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/weather",
};
