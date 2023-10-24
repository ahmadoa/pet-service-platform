import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl;
  const { pathname } = url;

  /*
  if (pathname.startsWith(`/api/`)) {
    if (!req.headers.get("referer")?.includes(process.env.APP_URL)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
*/
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
