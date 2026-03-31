import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter, Lora } from "next/font/google";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

// Cấu hình font Inter (Sans-serif cho Headings và UI)
const inter = Inter({
  // Sửa: Đặt tên biến CSS chính xác là "--font-inter"
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

// Cấu hình font Lora (Serif cho Body text - tạo sự sang trọng)
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  display: 'swap',
});

// ĐỊNH NGHĨA TYPE PROPS CHÍNH XÁC (Để xóa bỏ @ts-ignore)
type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Cấu hình Metadata (Tạm thời cố định, nhưng tiêu đề phù hợp hơn)
export const metadata: Metadata = {
  title: "Hoang Anh Trading & Construction JSC | Building the Future",
  description: "Hoang Anh Trading & Construction JSC - High-end professional construction services.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<RootLayoutProps>) {
  // Do phiên bản Next.js/React thử nghiệm, `params` là một Promise.
  // Chúng ta cần `await` nó để lấy giá trị `locale`.
  const { locale } = await params;
  let messages;
  try {
    // Sửa: Đường dẫn đến file messages đã được sửa lại cho đúng
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Nếu locale không tồn tại, trả về trang 404
    notFound();
  }
 
  return (
    <html
      lang={locale}
      // Sửa: Sử dụng ${inter.variable} và ${lora.variable}
      // antialiased để typo sắc nét hơn
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-900 text-white font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          
          {/* NAVBAR CHUNG CHO TẤT CẢ CÁC TRANG */}
          <Navbar />

          {/* MAIN CONTENT */}
          <main className="flex-1">
            {children}
          </main>

          {/* FOOTER */}
          <Footer />

        </NextIntlClientProvider>
      </body>
    </html>
  );
}