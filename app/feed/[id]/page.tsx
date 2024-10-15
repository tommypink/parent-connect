import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

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
  fullContent: string;
  attachments: { name: string; type: string; url: string }[];
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
    createdAt: new Date(2023, 8, 10, 9, 30), // September 10, 2023, 9:30 AM
    fullContent: '<p>Dear Parents,</p><p>Please be informed that the school will be closed on Monday, September 20th, due to the upcoming public holiday. Classes will resume as normal on Tuesday, September 21st.</p><p>We hope you enjoy the long weekend with your families.</p><p>Best regards,<br>Principal Johnson</p>',
    attachments: [
      { name: 'holiday_schedule.pdf', type: 'pdf', url: '/attachments/holiday_schedule.pdf' },
      { name: 'school_closure_notice.jpg', type: 'image', url: '/attachments/school_closure_notice.jpg' }
    ]
  },
  // ... other feed items
];

export async function generateStaticParams() {
  return mockFeedItems.map((item) => ({
    id: item.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const item = mockFeedItems.find(item => item.id === Number(params.id));
  return {
    title: item ? `${item.title} | ParentConnect` : 'Feed Item | ParentConnect',
  };
}

export default function FeedItemDetail({ params }: { params: { id: string } }) {
  const feedItem = mockFeedItems.find(item => item.id === Number(params.id));

  if (!feedItem) {
    return <div>Feed item not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={feedItem.sender.avatar} alt={feedItem.sender.name} />
              <AvatarFallback>{feedItem.sender.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{feedItem.title}</CardTitle>
              <p className="text-sm text-gray-500">{feedItem.sender.name} - {feedItem.sender.role}</p>
              <p className="text-xs text-gray-400">{format(feedItem.createdAt, 'PPpp')}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Summary</h3>
            <p>{feedItem.content}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Full Content</h3>
            <div dangerouslySetInnerHTML={{ __html: feedItem.fullContent }} className="prose max-w-none" />
          </div>
          {feedItem.attachments.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Attachments</h3>
              <div className="space-y-2">
                {feedItem.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={attachment.url} download>{attachment.name}</a>
                    </Button>
                    <span className="text-xs text-gray-500">{attachment.type.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}