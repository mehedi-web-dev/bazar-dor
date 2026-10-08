import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Marquee from "./component/Marquee";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-noto-serif-bengali",
  subsets: ["bengali", "latin"],
  display: "swap",
});

export const metadata = {
  title: "বাজার দর",
  description: "বাংলাদেশের দৈনিক বাজার দর",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-bengali antialiased bg-[#f0f5f0]">
        <Header />
        <Marquee/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}