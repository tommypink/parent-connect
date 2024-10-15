"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

type CalendarEvent = {
  id: number;
  title: string;
  date: Date;
  type: 'school' | 'grade' | 'class';
};

const mockEvents: CalendarEvent[] = [
  { id: 1, title: 'School Assembly', date: new Date(2023, 8, 15), type: 'school' },
  { id: 2, title: 'Grade 5 Field Trip', date: new Date(2023, 8, 20), type: 'grade' },
  { id: 3, title: 'Class 5A Parent Meeting', date: new Date(2023, 8, 25), type: 'class' },
];

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filter, setFilter] = useState<'all' | 'school' | 'grade' | 'class'>('all');

  const filteredEvents = mockEvents.filter(event => 
    filter === 'all' || event.type === filter
  );

  const eventDates = filteredEvents.map(event => event.date);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">School Calendar</h1>
      <div className="mb-4 flex space-x-2">
        <Button 
          variant={filter === 'all' ? 'default' : 'outline'} 
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'school' ? 'default' : 'outline'} 
          onClick={() => setFilter('school')}
        >
          School
        </Button>
        <Button 
          variant={filter === 'grade' ? 'default' : 'outline'} 
          onClick={() => setFilter('grade')}
        >
          Grade
        </Button>
        <Button 
          variant={filter === 'grade' ? 'default' : 'outline'} 
          onClick={() => setFilter('class')}
        >
          Class
        </Button>
      </div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border"
        modifiers={{
          event: (date) => eventDates.some(eventDate => 
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          )
        }}
        modifiersStyles={{
          event: { fontWeight: 'bold', color: 'blue' }
        }}
      />
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        {filteredEvents
          .filter(event => 
            event.date.getDate() === selectedDate?.getDate() &&
            event.date.getMonth() === selectedDate?.getMonth() &&
            event.date.getFullYear() === selectedDate?.getFullYear()
          )
          .map(event => (
            <Card key={event.id} className="mb-2">
              <CardContent className="p-4">
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.type.charAt(0).toUpperCase() + event.type.slice(1)} Event</p>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  );
}