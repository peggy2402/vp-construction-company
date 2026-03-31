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

// NÂNG CẤP METADATA ĐỂ CHUẨN SEO
const siteUrl = 'https://hoanganhgroup.vercel.app';

export const metadata: Metadata = {
  // URL cơ sở để tạo các URL tuyệt đối cho các tài nguyên như ảnh
  metadataBase: new URL(siteUrl),

  // Tiêu đề và mô tả mặc định, có thể được tùy chỉnh ở các trang con
  title: {
    default: "Hoang Anh Group | Kiến Tạo Tương Lai, Vững Bền Cùng Thời Gian",
    template: `%s | Hoang Anh Group`,
  },
  description: "Hoang Anh Group - Đơn vị tiên phong trong lĩnh vực xây dựng, thương mại và thí nghiệm công trình. Cung cấp giải pháp toàn diện, chất lượng, và đáng tin cậy.",
  keywords: ["xây dựng", "thương mại", "Hoang Anh Group", "thí nghiệm công trình", "xây dựng nghệ an", "công ty xây dựng", "Hoàng Anh"],

  // Cấu hình Open Graph (OG) cho việc chia sẻ trên mạng xã hội (Facebook, Zalo,...)
  openGraph: {
    title: "Hoang Anh Group | Kiến Tạo Tương Lai, Vững Bền Cùng Thời Gian",
    description: "Giải pháp toàn diện về xây dựng, thương mại và thí nghiệm công trình.",
    url: siteUrl,
    siteName: 'Hoang Anh Group',
    images: [
      {
        url: '/og-image.png', // Đường dẫn đến ảnh trong thư mục /public
        width: 1200,
        height: 630,
        alt: 'Hoang Anh Group - Công ty cổ phần Thương mại và Xây dựng',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },

  // Cấu hình cho Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: "Hoang Anh Group | Kiến Tạo Tương Lai, Vững Bền Cùng Thời Gian",
    description: "Giải pháp toàn diện về xây dựng, thương mại và thí nghiệm công trình.",
    images: [`${siteUrl}/og-image.png`], // Phải là URL tuyệt đối
  },
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