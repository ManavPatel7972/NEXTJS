export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <h1>Admin Layout</h1>
   {children}
    </>
    
  );
}