import "./globals.css";
import { Inter } from "next/font/google";
import Head from "../head";
import Providers from "../Providers";
import { dir } from "i18next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jerome Schaeffer",
    description: "Resume of Jerome Schaeffer",
};

import { languages } from "../i18n/settings";

export async function generateStaticParams() {
    return languages.map(lng => ({ lng }));
}

export default function RootLayout({
    children,
    params: { lng },
}: {
    children: React.ReactNode;
    params: { lng: string };
}) {
    return (
        <html lang={lng} dir={dir(lng)} className="h-full scroll-smooth" suppressHydrationWarning>
            <Head />

            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
