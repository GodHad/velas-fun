"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Inter } from "next/font/google";
import Providers from "./providers";
import { usePathname } from "next/navigation";
import "./globals.css";
import AlertComponent from "@/components/Common/AlertComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          {pathname.startsWith("/admin") ?
            <AdminLayout>{children}</AdminLayout>
            :
            <>
              <Header />
              {children}
              <Footer />
            </>
          }
          <AlertComponent />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}