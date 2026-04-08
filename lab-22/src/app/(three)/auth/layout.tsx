export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Auth Layout</h1>
   {children}
    </>
    
  );
}