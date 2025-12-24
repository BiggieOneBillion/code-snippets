'use client';

import { useState, useEffect } from 'react';
import EntryCard from './EntryCard';
import { EntryWithUser } from '@/types';

export default function FeedList() {
  const [entries, setEntries] = useState<EntryWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search - only trigger if 3+ characters or empty
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only search if query is 3+ characters or empty (to show all)
      if (searchQuery.length >= 3 || searchQuery.length === 0) {
        setDebouncedSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch entries - runs on mount and when search changes
  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        // Only add search param if we have a valid search query (3+ chars)
        if (debouncedSearch && debouncedSearch.length >= 3) {
          params.append('search', debouncedSearch);
        }

        const response = await fetch(`/api/feed?${params.toString()}`);
        const data = await response.json();

        if (response.ok) {
          setEntries(data.entries || []);
        }
      } catch (error) {
        console.error('Failed to fetch feed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, [debouncedSearch]);

  const isSearching = searchQuery.length > 0 && searchQuery.length < 3;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 right-6 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className={`input pl-10 bg-background-secondary border-border focus:border-primary w-full ${
            isSearching ? 'border-yellow-500/50' : ''
          }`}
          placeholder="Search snippets, documentation, users... (min 3 characters)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {isSearching && (
          <p className="text-xs text-yellow-500 mt-1 ml-1">
            Type at least 3 characters to search
          </p>
        )}
      </div>

      {/* Feed Content */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner" />
        </div>
      ) : entries.length > 0 ? (
        <div className="grid gap-6">
          {entries.map((entry) => (
            <EntryCard key={entry.id} entry={entry} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-surface rounded-xl border border-border">
          <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-foreground">No entries found</h3>
          <p className="text-foreground-secondary mt-2">
            Try adjusting your search or create a new entry
          </p>
        </div>
      )}
    </div>
  );
}
