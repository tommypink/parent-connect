"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Playdate = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
};

const mockPlaydates: Playdate[] = [
  { id: 1, title: 'Park Playdate', date: '2023-09-15', time: '15:00', location: 'Central Park' },
  { id: 2, title: 'Swimming Pool Fun', date: '2023-09-20', time: '14:00', location: 'Community Pool' },
  { id: 3, title: 'Board Game Afternoon', date: '2023-09-25', time: '16:00', location: 'Library' },
];

const PlaydateList = () => {
  const [playdates] = useState<Playdate[]>(mockPlaydates);

  return (
    <div className="space-y-4">
      {playdates.map((playdate) => (
        <Card key={playdate.id}>
          <CardHeader>
            <CardTitle className="text-lg">{playdate.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              {playdate.date} at {playdate.time}
            </p>
            <p className="text-sm text-gray-600 mb-4">{playdate.location}</p>
            <Button variant="outline" size="sm">Sign Up</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlaydateList;