'use client'

import "./globals.css";
import { GuideProvider } from "../app/context/GuideContext";
import Guide from "../app/components/guide/Guide";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GuideProvider>
          <div className="app-container">
            <div className="non-blurred-elements">
              <Guide />
            </div>
            <div className="">
              {children}
            </div>
          </div>
        </GuideProvider>
      </body>
    </html>
  );
}
