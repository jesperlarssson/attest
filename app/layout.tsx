import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";
import { ModalProvider } from "@/contexts/ModalContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ContextViewerProvider } from "@/contexts/ViewerContext";

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
    <ThemeProvider>
      <html lang="en">
        <AuthProvider>
          <ContextViewerProvider>
            <ModalProvider>
              <body className={`${font.className}`}>
                <Layout>
                  <>{children}</>
                </Layout>
              </body>
            </ModalProvider>
          </ContextViewerProvider>
        </AuthProvider>
      </html>
    </ThemeProvider>
  );
}
