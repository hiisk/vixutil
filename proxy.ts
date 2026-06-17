import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /calculator 경로에서만 언어 감지 후 redirect
  if (pathname === '/calculator' || pathname === '/calculator/') {
    const acceptLanguage = request.headers.get('accept-language') ?? '';
    const primary = acceptLanguage.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? '';

    if (primary.startsWith('ja')) {
      return NextResponse.redirect(new URL('/calculator/ja', request.url));
    }

    if (!primary.startsWith('ko')) {
      return NextResponse.redirect(new URL('/calculator/en', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
};
