import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
          crossOrigin="anonymous"
        />
      </head>

      <body className="">
        <div className="d-flex gap-3 mt-4 mb-3 ms-3">
          <li className="list-unstyled">
            <Link href="/"> Home </Link>
          </li>
          <li className="list-unstyled">
            <Link href="/user"> Users </Link>
          </li>
        </div>
        {children}
      </body>
    </html>
  );
}
