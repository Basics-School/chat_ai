import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  try {
    // This `try/catch` block is only here for the interactive tutorial.
    // Feel free to remove once you have Supabase connected.
    const url = request.nextUrl;
    const { supabase, response } = createClient(request);

    const authPath = url.pathname.startsWith("/auth");
    // Refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
    const { data, error } = await supabase.auth.getSession();
    const user = data.session?.user;
    
    if (authPath && user) {
      return NextResponse.redirect(new URL("/", url));
    }
    if (!authPath && !user) {
      return NextResponse.redirect(new URL("/auth/signin", url));
    }
    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}
