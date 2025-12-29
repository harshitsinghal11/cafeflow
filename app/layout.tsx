import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* 1. Added 'suppressHydrationWarning' to stop extension errors 
         2. Added global background color here
      */}
      <body className="bg-[#f8f8f8]" suppressHydrationWarning> 
        {children}
      </body>
    </html>
  );
}