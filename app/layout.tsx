import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { FullscreenButton } from "./fullscreen";

export default function RootLayout({
        children,
}: {
        children: React.ReactNode;
}) {
        return (
                <html lang="en" suppressHydrationWarning>
                        <body>
                                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                                        <SidebarProvider>{children}</SidebarProvider>
                                </ThemeProvider>
                        </body>
                </html>
        );
}

export const metadata = {
        generator: "v0.dev",
};
