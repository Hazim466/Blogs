export const metadata = {
  title: "My Blog App",
  description: "A blog platform with login and registration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
