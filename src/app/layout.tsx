import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";

import AuthProvider from "@/providers/nextAuthProvider";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "./api/auth/[...nextauth]/authOptions";
const dmSans = DM_Sans({ subsets: ["latin"] });
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "webathon",
  description:
    "created a next js based solution for ... and presented on web-athon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = getServerSession(nextAuthOptions);
  if (!session) return <div>loading... or unauthorized!</div>;
  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body
          className={`${dmSans.className} ${geistSans.variable} ${geistMono.variable} `}
        >
          <ThemeProvider attribute="class" disableTransitionOnChange>
            {children}
            <ThemeSwitcher />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
