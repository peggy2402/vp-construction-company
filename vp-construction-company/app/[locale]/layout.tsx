import type { Metadata } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import { Geist, Lora } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VP Construction Co., Ltd. | Building the Future, Today",
  description: "High-end, professional luxury construction company mockup.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  // @ts-ignore - Trusting the runtime error from experimental Next.js
  const locale = (await params).locale;
  
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
 
  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-900">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
