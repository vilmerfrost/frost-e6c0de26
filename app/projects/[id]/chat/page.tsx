'use client'

import ChatInterface from '@/components/ChatInterface';
import ProviderSelector from '@/components/ProviderSelector';
import { useState } from 'react';

export default function ProjectChatPage() {
  const [selectedProvider, setSelectedProvider] = useState('openai'); // Default provider

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-light-background">
        <ProviderSelector onProviderChange={setSelectedProvider} />
      </div>
      <div className="flex-grow">
        <ChatInterface selectedProvider={selectedProvider} />
      </div>
    </div>
  );
}