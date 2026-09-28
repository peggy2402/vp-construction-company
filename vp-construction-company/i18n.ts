import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Danh sách các ngôn ngữ
const locales = ['en', 'vi'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;

  // Nếu locale không hợp lệ hoặc chưa có, fallback về ngôn ngữ mặc định
  if (!locale || !locales.includes(locale)) {
    locale = 'vi';
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});