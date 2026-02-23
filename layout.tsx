// src/app/layout.tsx
"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import Navbar from "./NavBar";
import WallpaperChangerButton from "./WallpaperChangerButton";
import FriendsActivitySidebar from "./FriendsActivitySidebar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarToggleBtnRef = useRef<HTMLButtonElement>(null);

  const openSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isSidebarOpen) return;
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        sidebarToggleBtnRef.current &&
        !sidebarToggleBtnRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };
    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen, closeSidebar]);

  return (
    <html lang="en">
      <head>
        <title>Loco | The Anonymous Social Sphere</title>
        <meta name="description" content="Share your thoughts, connect with understanding individuals, and explore content in a refined anonymous environment." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} ${isSidebarOpen ? 'sidebar-is-open' : ''}`}>
        {/* Navbar is now a direct child of body, outside of app-wrapper and main-content-area */}
        <Navbar onSidebarToggle={openSidebar} sidebarToggleBtnRef={sidebarToggleBtnRef} />

        <div className="app-wrapper">
            {/* main-content-area now primarily handles the width of the page content, not the sidebar interaction */}
            <div className="main-content-area">
                {/* page-content-pusher is applied to the main tag */}
                <main className="page-content-pusher">{children}</main>
            </div>
        </div>
        {/* FriendsActivitySidebar is also a direct child of body */}
        <FriendsActivitySidebar ref={sidebarRef} isOpen={isSidebarOpen} onClose={closeSidebar} />
        <WallpaperChangerButton />
      </body>
    </html>
  );
}