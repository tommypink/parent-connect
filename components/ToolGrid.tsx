import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Book, Calendar, Clock, FileText, MessageCircle, Pencil, User } from 'lucide-react';

const tools = [
  { icon: AlertCircle, label: 'Report Absence' },
  { icon: Clock, label: 'Early Pickup' },
  { icon: Calendar, label: 'Schedule Meeting' },
  { icon: MessageCircle, label: 'Message Teacher' },
  { icon: Book, label: 'Homework Help' },
  { icon: User, label: 'Update Profile' },
  { icon: FileText, label: 'View Reports' },
  { icon: Pencil, label: 'Permission Slip' },
];

const ToolGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tools.map((tool, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <tool.icon className="w-8 h-8 mb-2 text-blue-500" />
            <span className="text-xs text-center">{tool.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ToolGrid;