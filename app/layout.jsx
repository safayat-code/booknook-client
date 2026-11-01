import { Young_Serif, DM_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const display = Young_Serif({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  title: "BookNook | A small online library",
  description: "Add a book, borrow a book, return a book.",
};

const themeScript = `try{var t=localStorage.getItem("booknook-theme");if(t){document.documentElement.setAttribute("data-theme",t)}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="booknook" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
