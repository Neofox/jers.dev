import { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "Jerome Schaeffer",
  description: "Resume of Jerome Schaeffer",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
