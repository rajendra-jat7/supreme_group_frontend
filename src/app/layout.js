import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "SUPERME GROUP",
  description: "Superme Group Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-manrope">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
