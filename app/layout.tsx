import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MATE",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${font.className}`}>
          <Layout>
            <>{children}</>
          </Layout>
        </body>
      </AuthProvider>
    </html>
  );
}
