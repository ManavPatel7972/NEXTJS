export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Client Layout</h1>
   {children}
    </>
    
  );
}