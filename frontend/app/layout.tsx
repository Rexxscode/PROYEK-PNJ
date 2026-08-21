import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-context";
import { ToastProvider } from "./lib/toast-context";
import ScrollToTop from "./components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillMatch - Career Readiness Platform",
  description:
    "Platform career readiness yang menjembatani kesenjangan kompetensi antara siswa vokasi dan kebutuhan industri.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ background: "#0f172a", color: "#e2e8f0" }}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.background='#0f172a';document.documentElement.style.color='#e2e8f0'}else{document.documentElement.classList.remove('dark');document.documentElement.style.background='#f8fafc';document.documentElement.style.color='#0f172a'}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider><ToastProvider>{children}</ToastProvider></ThemeProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}