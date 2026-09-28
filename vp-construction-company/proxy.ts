import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware({
  // Danh sách tất cả các ngôn ngữ được hỗ trợ
  locales: ['en', 'vi'],

  // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ phù hợp
  defaultLocale: 'vi'
});

export function proxy(request: NextRequest) {
  return handleI18nRouting(request);
}

export const config = {
  // Bỏ qua tất cả các đường dẫn không cần quốc tế hóa (API, file tĩnh, ảnh, hệ thống Vercel)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
