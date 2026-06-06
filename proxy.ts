import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 홈(/) 경로에서만 언어 감지 후 redirect
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') ?? '';
    const primary = acceptLanguage.split(',')[0]?.split(';')[0]?.trim().toLowerCase() ?? '';

    if (primary.startsWith('ja')) {
      return NextResponse.redirect(new URL('/ja', request.url));
    }

    if (!primary.startsWith('ko')) {
      // ja가 아닌 비한국어(en 포함 기타) → /en 으로 redirect
      return NextResponse.redirect(new URL('/en', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 홈(/) 경로만 매칭
     * _next/static, _next/image, api, favicon 등 제외
     */
    '/((?!api|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
};
