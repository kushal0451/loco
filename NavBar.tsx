// src/app/NavBar.tsx
"use client";
import React, { RefObject, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  Cog6ToothIcon, // Settings Icon
  UsersIcon      // Example for Friends Activity Sidebar Toggle
} from '@heroicons/react/24/outline';
import NotificationDropdown, { NotificationItem } from './notifications/_components/NotificationDropdown'; // Adjust path if necessary

interface NavbarProps {
  onSidebarToggle: () => void; // For FriendsActivitySidebar
  sidebarToggleBtnRef: RefObject<HTMLButtonElement>; // For FriendsActivitySidebar
}

// MOCK NOTIFICATIONS (Keep your existing or similar mock data)
const MOCK_NOTIFICATIONS_DATA: NotificationItem[] = [
  { id: 'n1', type: 'new_message', actorName: 'Lyra Orionis', message: 'sent you a new message.', link: '/messages/convo1', timestamp: '2m ago', isRead: false, actorAvatarUrl: '/celestial_avatars/lyra.png' },
  { id: 'n2', type: 'club_invite', message: 'You have been invited to join "Quantum Innovators".', link: '/club/quantum-innovators/join', timestamp: '1h ago', isRead: false },
  { id: 'n3', type: 'oracle_update', message: 'Your query to The Oracle "Future of AI" has new insights.', link: '/oracle/query/xyz', timestamp: '3h ago', isRead: true },
  { id: 'n4', type: 'connection_request', actorName: 'Dr. Aris Thorne', message: 'wants to connect with you.', link: '/connections/requests', timestamp: '1d ago', isRead: false, actorAvatarUrl: '/celestial_avatars/aris.png' },
];

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle, sidebarToggleBtnRef }) => {
  const pathname = usePathname();
  const navProfileImages = [ // Placeholder - use your actual image URLs or logic
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=36&h=36&fit=crop&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=36&h=36&fit=crop&q=80",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=36&h=36&fit=crop&q=80",
  ];

  const getLinkClass = (path: string, isExact: boolean = false) => {
    const isActive = isExact ? pathname === path : pathname.startsWith(path);
    if (path === "/" && pathname !== "/") return "nav-item"; // Home only active if exactly "/"
    return `nav-item ${isActive ? 'active' : ''}`;
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS_DATA);
  const notificationBellRef = useRef<HTMLButtonElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => setShowNotifications(prev => !prev);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    alert("All notifications marked as read (mock).");
  };
  const handleNotificationClick = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
    console.log(`Notification ${notificationId} clicked & marked as read (mock).`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNotifications &&
        notificationBellRef.current && !notificationBellRef.current.contains(event.target as Node) &&
        notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <nav className="navbar">
      <div className="navbar-content-wrapper">
        <div className="nav-logo-items">
          <Link href="/" className={getLinkClass('/', true)} aria-label="Home">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M6 2H18C19.1046 2 20 2.89543 20 4V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2ZM6 4V20H18V4H6ZM8 6H16V8H8V6ZM8 10H16V12H8V10ZM8 14H12V16H8V14Z"></path></svg>
          </Link>
          <div className="nav-links hidden md:flex">
            <Link href="/" className={getLinkClass('/', true)}>Home</Link>
            <Link href="/dice" className={getLinkClass('/dice')}>Dice</Link>
            <Link href="/live" className={getLinkClass('/live')}>Live</Link>
            <Link href="/confessions" className={getLinkClass('/confessions')}>Confessions</Link>
            <Link href="/profile" className={getLinkClass('/profile')}>Profile</Link>
            <Link href="/club" className={getLinkClass('/club')}>Club</Link>
            <Link href="/oracle" className={getLinkClass('/oracle')}>Oracle</Link>
            <Link href="/messages" className={getLinkClass('/messages')}>Messages</Link>
            {/* Settings link is now an icon in nav-actions */}
          </div>
        </div>

        <div className="nav-actions">
          <button className="search-icon-btn nav-action-item" aria-label="Search">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>
          <div className="profile-icons hidden md:flex">
            {navProfileImages.map((src, index) => (
              <div key={index} className="profile-icon"><img src={src} alt={`User ${index + 1}`} /></div>
            ))}
            <div className="profile-icon more">+1</div>
          </div>

          {/* Notification Bell & Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              ref={notificationBellRef}
              onClick={toggleNotifications}
              className={`nav-action-item notification-bell-btn ${pathname.startsWith('/notifications') ? 'active-icon-link' : ''}`}
              aria-label="Open notifications"
              title="Notifications"
            >
              <BellIcon className="h-6 w-6" />
              {unreadNotificationCount > 0 && (
                <span className="notification-badge global-badge">{unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}</span>
              )}
            </button>
            {showNotifications && (
              <div ref={notificationDropdownRef}>
                <NotificationDropdown
                  notifications={notifications}
                  onMarkAllRead={handleMarkAllRead}
                  onNotificationClick={handleNotificationClick}
                  onClose={() => setShowNotifications(false)}
                />
              </div>
            )}
          </div>

          {/* Friends Activity Sidebar Toggle */}
          <button
            ref={sidebarToggleBtnRef}
            onClick={onSidebarToggle}
            className="sidebar-toggle-btn nav-action-item"
            aria-label="Open activity feed"
            title="Activity Feed"
          >
            <UsersIcon className="h-6 w-6" />
          </button>

          {/* Settings Link Icon - UPDATED IMPLEMENTATION */}
          <Link
            href="/settings" // This should point to your settings route (which redirects to /settings/account)
            className={`nav-action-item settings-link-icon ${pathname.startsWith('/settings') ? 'active-icon-link' : ''}`}
            aria-label="Open settings"
            title="Settings"
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </Link>

          {/* Mobile Menu Toggle */}
          <button className="nav-action-item md:hidden" aria-label="Open menu">
              <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;