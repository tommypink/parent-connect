"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

type FeedItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  sender: {
    name: string;
    avatar: string;
    role: string;
    email: string;
  };
  createdAt: Date;
};

const mockFeedItems: FeedItem[] = [
  {
    id: 1,
    title: 'School Closure Notice',
    content: 'The school will be closed on Monday due to a public holiday.',
    category: 'Announcement',
    sender: {
      name: 'Principal Johnson',
      avatar: 'https://i.pravatar.cc/150?u=principal',
      role: 'School Principal',
      email: 'principal@uwcsea.edu.sg'
    },
    createdAt: new Date(2023, 8, 10, 9, 30) // September 10, 2023, 9:30 AM
  },
  {
    id: 2,
    title: 'Parent-Teacher Conference',
    content: 'Please sign up for the upcoming parent-teacher conference.',
    category: 'Event',
    sender: {
      name: 'Ms. Lee',
      avatar: 'https://i.pravatar.cc/150?u=teacher',
      role: 'Grade 5 Teacher',
      email: 'lee@uwcsea.edu.sg'
    },
    createdAt: new Date(2023, 8, 11, 14, 15) // September 11, 2023, 2:15 PM
  },
  {
    id: 3,
    title: 'New Lunch Menu',
    content: 'Check out the new lunch menu for next week.',
    category: 'Update',
    sender: {
      name: 'Cafeteria Staff',
      avatar: 'https://i.pravatar.cc/150?u=cafeteria',
      role: 'Cafeteria Manager',
      email: 'cafeteria@uwcsea.edu.sg'
    },
    createdAt: new Date(2023, 8, 12, 11, 0) // September 12, 2023, 11:00 AM
  },
];

const Feed = () => {
  const [feedItems] = useState<FeedItem[]>(mockFeedItems);

  return (
    <div className="space-y-4">
      {feedItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={item.sender.avatar} alt={item.sender.name} />
                    <AvatarFallback>{item.sender.name[0]}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage src={item.sender.avatar} />
                      <AvatarFallback>{item.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{item.sender.name}</h4>
                      <p className="text-sm">{item.sender.role}</p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">
                          {item.sender.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              <span className="text-sm text-muted-foreground">{item.sender.name}</span>
            </div>
            <Link href={`/feed/${item.id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-blue-500">{item.title}</h3>
            </Link>
            <p className="text-sm text-gray-600 mb-2">{item.content}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.category}</span>
              <span className="text-xs text-gray-500">{formatDistanceToNow(item.createdAt, { addSuffix: true })}</span>
            </div>
            <div className="flex justify-end">
              <Link href={`/feed/${item.id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Feed;