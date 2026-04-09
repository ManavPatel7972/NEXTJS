
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="../../../templatemo_602_graph_page/templatemo-graph-page.css"></link>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
