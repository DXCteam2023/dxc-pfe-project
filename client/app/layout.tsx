import Head from "next/head";
import "./globals.css";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "DXC Technology",
  description:
    "We are a leading IT company dedicated to providing cutting-edge solutions and services to empower businesses and individuals in the digital age.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <style jsx global>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
