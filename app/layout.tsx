"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Head from "./head";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//     title: "Jerome Schaeffer",
//     description: "Resume of Jerome Schaeffer",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
            <Head />

            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
