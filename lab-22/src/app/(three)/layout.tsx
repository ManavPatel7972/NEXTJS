export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Three Layout</h1>
   {children}
    </>
    
  );
}