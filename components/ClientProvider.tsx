"use client"

import { SessionProvider } from "next-auth/react"
import GoogleAnalytics from "@bradgarropy/next-google-analytics"
export default function ClientProvider({
    children
}: {
    children: React.ReactNode;
}) {
    return <SessionProvider>{children}
        <>
            <GoogleAnalytics measurementId="G-Q1NV212YX8" />
        </>
    </SessionProvider>
}