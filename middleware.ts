import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/lens/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/products/lens/:path*", "/api/lens/:path*"],
};