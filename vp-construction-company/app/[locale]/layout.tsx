import type { Metadata } from "next";
import { Geist, Lora } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

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
  const messages = await getMessages();
 
  return (
    <html
      lang={params.locale}
      className={`${geistSans.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-900">
        <NextIntlClientProvider locale={params.locale} messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
