import Navbar from "@/components/Navbar";
import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "Ali Saber | Academic Portfolio",
  description:
    "Personal academic portfolio of M. Ali Saber - MSc EEE, Tehran University",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans bg-white text-deep-space antialiased transition-colors duration-300">
        <Script id="theme-init" strategy="beforeInteractive">
          {`
          (function() {
            try {
              var stored = localStorage.getItem('theme');
              var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = stored || (systemDark ? 'dark' : 'light');
              document.documentElement.classList.toggle('dark', theme === 'dark');
            } catch (e) {}
          })();
        `}
        </Script>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
