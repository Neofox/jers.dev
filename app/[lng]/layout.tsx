import "./globals.css";
import { Inter } from "next/font/google";
import Head from "../head";
import Providers from "../Providers";
import { dir } from "i18next";
import { languages } from "../i18n/settings";
import GoogleAnalytics from "@/components/Utils/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Jerome Schaeffer",
    description: "Resume of Jerome Schaeffer",
};

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
            <GoogleAnalytics GA_MEASUREMENT_ID="G-MLEGW0GG4H" />
            <body className={inter.className}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
