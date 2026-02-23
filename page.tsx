// src/app/page.tsx
"use client";
import React from 'react';
// Removed: import './globals.css'; // This is now in layout.tsx

// Use a proper icon library or SVGs for better quality
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
    <path d="M12 2.5a5.5 5.5 0 0 1 5.5 5.5c0 1.823-.894 3.431-2.275 4.474-.19.145-.392.281-.603.408A7.002 7.002 0 0 1 12 20a7.002 7.002 0 0 1-4.622-1.618c-.21-.127-.412-.263-.603-.408C5.394 11.43 4.5 9.823 4.5 8A5.5 5.5 0 0 1 12 2.5ZM12 1C7.03 1 3 5.03 3 10c0 2.096.707 3.996 2.105 5.523A8.95 8.95 0 0 0 12 23a8.95 8.95 0 0 0 6.895-4.477C20.293 13.996 21 12.096 21 10c0-4.97-4.03-9-9-9Z" />
  </svg>
);

const sampleConfessions = [
  { id: 1, author: "Anonymous581", content: "Feeling overwhelmed by expectations. It's tough to keep up appearances when inside you're struggling to find your own path. Sometimes I just want to disappear for a while.", date: "Jun 10, 2024", time: "9:40 AM" },
  { id: 2, author: "Anonymous381", content: "I secretly practice K-pop dance routines in my room. My family thinks I'm studying. One day, I'll nail that BTS choreography and shock everyone at a talent show.", date: "Jun 15, 2024", time: "9:40 AM" },
  { id: 3, author: "NightOwlCoder", content: "Spent all night debugging a single line of code. The satisfaction when it finally worked was immense, but now I look and feel like a zombie. Coffee is my only friend.", date: "Jun 18, 2024", time: "11:20 AM" }
];

export default function HomePage() {
  return (
    <div className="page-container"> {/* This class is styled in globals.css */}
      {/* Navbar is now rendered by RootLayout */}

      <section className="hero-section">
        <h1 className="hero-title">Share Your Truth, Anonymously.</h1>
        <p className="hero-subtitle">A sanctuary for your thoughts. Connect with a community that understands.</p>
        <div className="hero-buttons">
          <button className="btn btn-brand-primary">Continue Anonymously</button>
          <button className="btn btn-outline">Create Identity</button>
        </div>
      </section>

      <section className="confessions-section">
        <div className="confessions-grid">
          {sampleConfessions.map((confession) => (
            <article key={confession.id} className="confession-card">
              <div className="card-header">
                <div className="card-avatar"><UserIcon /></div>
                <span className="card-author">By {confession.author}</span>
              </div>
              <p className="card-content">{confession.content}</p>
              <div className="card-footer">
                <span>{confession.date}</span>
                <span>{confession.time}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}