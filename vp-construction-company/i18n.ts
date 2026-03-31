import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Danh sách các ngôn ngữ
const locales = ['en', 'vi'];

export default getRequestConfig(async ({locale}) => {
  // Xác thực tham số `locale`
  const currentLocale = (locale as string) || 'en';
  if (!locales.includes(currentLocale)) notFound();

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default
  };
});