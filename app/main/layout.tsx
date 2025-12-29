import Navbar from "@/src/component/Navbar";
import Footer from "@/src/component/Footer";
import FloatingCart from "@/src/component/FloatingCart";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <> {/* <--- Use a Fragment, NOT html/body */}
      <Navbar />
      
      {/* This renders the page content (e.g. Menu, Checkout) */}
      {children}
      
      <Footer />
      <FloatingCart />
    </>
  );
}