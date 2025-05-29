import React from "react";
import Providers from "./provider/provider";
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <Providers>
      <html>
        <body>
          {children}
        </body>
      </html>
    </Providers>
  )
}