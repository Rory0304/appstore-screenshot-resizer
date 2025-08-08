import type { Metadata } from "next";
import "./globals.css";
import { pretendard } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "AppStore Screenshot Resizer",
  description: "AppStore Screenshot Resizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} bg-[#FFFCF9]`}>
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
