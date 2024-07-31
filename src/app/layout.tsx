import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const iranSans = localFont({
  src: "../../public/fonts/IRANSansXFaNum-Regular.woff",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Isandogh",
  description: "نبض صندوق های بورسی",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${iranSans.className} min-h-screen leading-loose`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="pt-16  h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
