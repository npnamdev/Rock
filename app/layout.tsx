import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trí Tuệ Nhân Tạo - Chìa Khóa Của Cuộc Cách Mạng Công Nghệ",
  description: "Học hỏi và phát triển kỹ năng trong lĩnh vực AI để trở thành chuyên gia trong các công nghệ thông minh, tự động hóa và phân tích dữ liệu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
