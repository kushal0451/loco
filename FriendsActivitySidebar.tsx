// src/app/FriendsActivitySidebar.tsx
"use client";
import React, { forwardRef } from 'react'; // Import forwardRef
import { XMarkIcon } from '@heroicons/react/24/outline';

interface FriendsActivitySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Dummy data
const friends = [
    { name: 'name1', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop', location: 'At Youtube', status: 'Online', statusClass: 'online' },
    { name: 'name2', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop', location: 'At Dice', status: 'Online', statusClass: 'online' },
    // ... more friends
];

// Use forwardRef to pass the ref to the <aside> element
const FriendsActivitySidebar = forwardRef<HTMLDivElement, FriendsActivitySidebarProps>(
  ({ isOpen, onClose }, ref) => {
    return (
      // Attach the ref here
      <aside ref={ref} className={`friends-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header-controls">
          <h2 className="friends-sidebar-header">MI AMOR</h2>
          <button onClick={onClose} className="sidebar-close-btn" aria-label="Close sidebar">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <ul className="friend-list-scrollable">
          {friends.map(friend => (
            <li key={friend.name} className="friend-item">
              <div className="friend-avatar">
                <img src={friend.avatar} alt={friend.name} />
              </div>
              <div className="friend-info">
                <div className="friend-name">{friend.name}</div>
                {friend.location && <div className="friend-status-location">{friend.location}</div>}
              </div>
              <div className={`friend-activity-status ${friend.statusClass}`}>{friend.status}</div>
            </li>
          ))}
        </ul>
      </aside>
    );
  }
);

FriendsActivitySidebar.displayName = "FriendsActivitySidebar"; // Good practice for forwardRef components

export default FriendsActivitySidebar;