// src/app/WallpaperChangerButton.tsx
"use client";

import React, { useState, useEffect } from 'react';

// Minimalist Icon (can be replaced with an SVG for better quality)
// The styling (size, color) will primarily come from .wallpaper-changer-icon svg/span in globals.css
const WallpaperIcon = () => {
  // If you want to use an SVG directly, you can do this:
  // return (
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  //     <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V5h16l.002 14H4z" />
  //     <path d="m10 14-1-1-3 4h12l-5-7-3 4z" />
  //   </svg>
  // );
  return <span>🖼️</span>; // Keeping the emoji for simplicity as per previous, but SVG is better for "elite"
};

export default function WallpaperChangerButton() {
  const [currentWallpaperUrl, setCurrentWallpaperUrl] = useState<string | null>(null);

  // Effect to load and apply saved wallpaper on component mount
  useEffect(() => {
    const savedWallpaper = localStorage.getItem('userSelectedWallpaper');
    if (savedWallpaper) {
      document.body.style.backgroundImage = `url('${savedWallpaper}')`;
      setCurrentWallpaperUrl(savedWallpaper);
    }
  }, []);

  const handleWallpaperChangeClick = () => {
    const newWallpaperUrl = prompt(
      "Enter URL for new wallpaper (or leave blank to clear and revert to default):",
      currentWallpaperUrl || ""
    );

    // User pressed cancel
    if (newWallpaperUrl === null) {
      return;
    }

    if (newWallpaperUrl.trim() === "") {
      // Clear custom wallpaper and revert to CSS default
      document.body.style.backgroundImage = ""; // Clears inline style, CSS background takes over
      localStorage.removeItem('userSelectedWallpaper');
      setCurrentWallpaperUrl(null);
      alert("Custom wallpaper cleared. Reverted to default background.");
    } else {
      // Basic URL validation (can be improved)
      if (newWallpaperUrl.startsWith('http://') || newWallpaperUrl.startsWith('https://')) {
        try {
            // Test if it's a valid URL format that can be used for images
            new URL(newWallpaperUrl); // This will throw an error for invalid URL formats
            document.body.style.backgroundImage = `url('${newWallpaperUrl}')`;
            localStorage.setItem('userSelectedWallpaper', newWallpaperUrl);
            setCurrentWallpaperUrl(newWallpaperUrl);
            // alert(`Wallpaper changed to: ${newWallpaperUrl}`); // Optional: success message
        } catch (error) {
            alert("Invalid URL format. Please enter a valid image URL.");
        }
      } else {
        alert("Invalid URL. Please ensure it starts with http:// or https://");
      }
    }
  };

  return (
    <button
      className="wallpaper-changer-icon" // This class is styled in globals.css
      onClick={handleWallpaperChangeClick}
      title="Change Background Wallpaper"
      aria-label="Change Background Wallpaper"
    >
      <WallpaperIcon />
    </button>
  );
}