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
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

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