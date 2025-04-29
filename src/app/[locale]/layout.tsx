import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Challenges App for charity assosiations",
  description: "Created By Oussama Mahdjour",
};
const locales = ["en", "ar", "fr"];

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!locales.includes(locale as string)) notFound();
  const messages = useMessages();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${inter.className} md:h-screen flex flex-col text-xl relative`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <Navbar />
            {children}
            <Image
              src='/images/palastine-1.svg'
              alt='Banner'
              fill
              className='w-full -z-30 opacity-40 h-full  blur-lg object-cover'
            />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
