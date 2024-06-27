import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import { ModalProvider } from "./contexts/ModalContext";
import { Navbar } from "@/components/Navbar";
import { Modal } from "@/components/Modal";
import { Footer } from "@/components/Footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Wave",
  description:
    "Explore uma vasta coleção de filmes e séries de todos os gêneros. Junte-se à onda Movie Wave!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" data-theme="forest">
      <body className={poppins.className}>
        <AuthProvider>
          <ModalProvider>
            <Navbar />
            {children}
            <Modal />
            <Footer />
          </ModalProvider>
        </AuthProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </body>
    </html>
  );
}
