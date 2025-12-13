import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Verificação de Email",
  description: "Página de confirmação de verificação de e-mail.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-inter`}>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-[600px] w-full p-8 text-center rounded-lg shadow-md">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
