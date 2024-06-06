import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import { DefaultLayout } from "./defaultLayout";
import { ModalProvider } from "./contexts/ModalContext";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </head>
      <body className={poppins.className}>
        <AuthProvider>
          <ModalProvider>
            <DefaultLayout>{children}</DefaultLayout>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
