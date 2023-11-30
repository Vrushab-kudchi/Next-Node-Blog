import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.has('jwt');

    if (token)
    {
        return NextResponse.next();
    }
    else
    {
        return NextResponse.redirect(new URL('/', request.url))
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}