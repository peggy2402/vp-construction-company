import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Danh sách tất cả các ngôn ngữ được hỗ trợ
  locales: ['en', 'vi'],

  // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ phù hợp
  defaultLocale: 'en'
});

export const config = {
  // Bỏ qua tất cả các đường dẫn không cần quốc tế hóa (API, file tĩnh, ảnh,...)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};