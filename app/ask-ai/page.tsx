"use client";

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

export default function AskAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: getAIResponse(input.trim()),
          sender: 'ai',
        };
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }, 1000);
    }
  };

  const getAIResponse = (question: string): string => {
    // This is a mock AI response. In a real application, you would integrate with an actual AI service.
    const responses: { [key: string]: string } = {
      "holiday": "The next school holiday is from December 15th to January 5th for the winter break.",
      "bus": "To change your school bus route, please contact the transportation office at transport@uwcsea.edu.sg or visit the school's transportation portal.",
      "default": "I'm sorry, I don't have specific information about that. Please check the school's official website or contact the school office for more details."
    };

    const lowercaseQuestion = question.toLowerCase();
    if (lowercaseQuestion.includes("holiday") || lowercaseQuestion.includes("vacation")) {
      return responses["holiday"];
    } else if (lowercaseQuestion.includes("bus") || lowercaseQuestion.includes("transport")) {
      return responses["bus"];
    } else {
      return responses["default"];
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Ask AI</h1>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
            <Card className={`max-w-[80%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
              <CardContent className="p-3">
                {message.sender === 'ai' && (
                  <div className="flex items-center mb-2">
                    <Avatar className="w-6 h-6 mr-2">
                      <AvatarImage src="/ai-avatar.png" alt="AI" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">UWC AI</span>
                  </div>
                )}
                <p>{message.text}</p>
              </CardContent>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Ask about UWC..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}