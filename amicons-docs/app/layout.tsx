import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Amicon, { aiAmicons, aiGithub } from "@studio384/amicons";
import { Lexend } from "next/font/google";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amicons Next",
  description: "A brand new Amicons documentation website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable}`}>
        <div className="root">
          <header className="sticky top-3">
            <div className="container max-w-[1160px] mx-auto">
              <div className="bg-indigo-900/50 backdrop-blur-md rounded-md my-3 ps-5 p-3 grid grid-cols-[1fr_auto_1fr] items-center">
                <h1 className="flex gap-2 items-center text-lg">
                  <Amicon icon={aiAmicons} className="size-4" />
                  <span className="leading-3">Amicons</span>
                </h1>
                <nav className="flex">
                  <Link
                    className="hover:bg-indigo-700/50 px-3 rounded-sm py-1.5 flex gap-2 items-center text-sm"
                    href="/"
                  >
                    Home
                  </Link>
                  <Link
                    className="hover:bg-indigo-700/50 px-3 rounded-sm py-1.5 flex gap-2 items-center text-sm"
                    href="/icons"
                  >
                    Icons
                  </Link>
                </nav>
                <div className="flex justify-end">
                  <Link
                    className="hover:bg-indigo-700/50 px-3 rounded-sm py-1.5 flex gap-2 items-center text-sm"
                    href="https://github.com/studio384/amicons"
                  >
                    <Amicon icon={aiGithub} className="size-4" />
                    GitHub
                  </Link>
                </div>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
