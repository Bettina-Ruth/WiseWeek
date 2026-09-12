import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { WiseWeekProvider } from "@/context/WiseWeekContext";
import { ModalProvider } from "@/context/ModalContext";
import { AntiProcProvider } from "@/context/AntiProcContext";
import ToastContainer from "@/components/ui/ToastContainer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "WiseWeek — Plan your week wisely",
  description: "A weekly planner that improves your planning decisions, not just your task list.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <body className="font-body">
        <WiseWeekProvider>
          <ModalProvider>
            <AntiProcProvider>
              {children}
              <ToastContainer />
            </AntiProcProvider>
          </ModalProvider>
        </WiseWeekProvider>
      </body>
    </html>
  );
}
