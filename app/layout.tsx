import type { Metadata, Viewport } from "next";
import "./globals.css";
// import { Nunito } from "next/font/google";
// const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trí Tuệ Nhân Tạo - Chìa Khóa Của Cuộc Cách Mạng Công Nghệ",
  description: "Học hỏi và phát triển kỹ năng trong lĩnh vực AI để trở thành chuyên gia trong các công nghệ thông minh, tự động hóa và phân tích dữ liệu."
};
 
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
