'use client'

import { useState } from 'react';

interface ChatInterfaceProps {
  selectedProvider: string;
}

export default function ChatInterface({ selectedProvider }: ChatInterfaceProps) {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState<string[]>([]);

  const sendMessage = async () => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, provider: selectedProvider }),
    });

    const data = await response.json();
    setChatLog([...chatLog, `You: ${message}`, data.response]);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-grow overflow-y-auto">
        {chatLog.map((message, index) => (
          <div key={index} className="mb-2">
            {message}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex">
          <input
            type="text"
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-light-background text-text-primary"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="ml-2 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}