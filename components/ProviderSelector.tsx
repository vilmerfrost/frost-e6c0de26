'use client'

import { useState, useEffect } from 'react';

interface ProviderSelectorProps {
  onProviderChange: (provider: string) => void;
}

export default function ProviderSelector({ onProviderChange }: ProviderSelectorProps) {
  const [providers, setProviders] = useState<string[]>([]);

  useEffect(() => {
    // Fetch providers from the API
    const fetchProviders = async () => {
      const response = await fetch('/api/providers');
      const data = await response.json();
      setProviders(data.providers);
    };

    fetchProviders();
  }, []);

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onProviderChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="provider" className="block text-sm font-medium text-text-secondary">
        Select AI Provider:
      </label>
      <select
        id="provider"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm bg-light-background text-text-primary"
        onChange={handleProviderChange}
      >
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
    </div>
  );
}