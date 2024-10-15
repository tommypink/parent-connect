"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, MessageSquare, Grid } from 'lucide-react';

const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-lg mx-auto flex justify-around">
        <Link href="/" className={`p-4 flex flex-col items-center ${pathname === '/' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Home size={24} />
          <span className="text-xs mt-1">Feed</span>
        </Link>
        <Link href="/calendar" className={`p-4 flex flex-col items-center ${pathname === '/calendar' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Calendar size={24} />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        <Link href="/ask-ai" className={`p-4 flex flex-col items-center ${pathname === '/ask-ai' ? 'text-blue-500' : 'text-gray-500'}`}>
          <MessageSquare size={24} />
          <span className="text-xs mt-1">Ask AI</span>
        </Link>
        <Link href="/tools" className={`p-4 flex flex-col items-center ${pathname === '/tools' ? 'text-blue-500' : 'text-gray-500'}`}>
          <Grid size={24} />
          <span className="text-xs mt-1">Tools</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;