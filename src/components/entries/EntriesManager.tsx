'use client';

import { useState, useEffect } from 'react';
import { EntryWithProject } from '@/types';
import EntryCard from './EntryCard';
import EntryFormModal from './EntryFormModal';

export default function EntriesManager() {
  const [entries, setEntries] = useState<EntryWithProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EntryWithProject | null>(null);
  const [filter, setFilter] = useState<'all' | 'code' | 'markdown'>('all');

  const fetchEntries = async () => {
    try {
      const response = await fetch('/api/entries');
      const data = await response.json();
      if (response.ok) {
        setEntries(data.entries);
      }
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleCreateNew = () => {
    setEditingEntry(null);
    setIsModalOpen(true);
  };

  const handleEdit = (entry: EntryWithProject) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleDelete = async (entryId: string) => {
    if (!confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      const response = await fetch(`/api/entries/${entryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEntries(entries.filter(e => e.id !== entryId));
      }
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
    fetchEntries();
  };

  const filteredEntries = entries.filter(entry => {
    if (filter === 'all') return true;
    if (filter === 'code') return entry.type === 'CODE';
    if (filter === 'markdown') return entry.type === 'MARKDOWN';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
            My Entries
          </h1>
          <p className="text-sm md:text-base text-foreground-secondary">
            Manage your code snippets and documentation
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="btn btn-primary"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary text-white'
              : 'bg-surface text-foreground-secondary hover:bg-background-tertiary'
          }`}
        >
          All ({entries.length})
        </button>
        <button
          onClick={() => setFilter('code')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'code'
              ? 'bg-primary text-white'
              : 'bg-surface text-foreground-secondary hover:bg-background-tertiary'
          }`}
        >
          Code ({entries.filter(e => e.type === 'CODE').length})
        </button>
        <button
          onClick={() => setFilter('markdown')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'markdown'
              ? 'bg-primary text-white'
              : 'bg-surface text-foreground-secondary hover:bg-background-tertiary'
          }`}
        >
          Markdown ({entries.filter(e => e.type === 'MARKDOWN').length})
        </button>
      </div>

      {/* Entries List */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-foreground-secondary mt-2">Loading entries...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="w-16 h-16 mx-auto text-foreground-secondary/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No entries yet</h3>
          <p className="text-foreground-secondary mb-4">
            {filter === 'all'
              ? 'Create your first code snippet or documentation entry'
              : `No ${filter} entries found`}
          </p>
          {filter === 'all' && (
            <button
              onClick={handleCreateNew}
              className="btn btn-primary mx-auto"
            >
              Create Entry
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map(entry => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <EntryFormModal
          entry={editingEntry}
          onClose={() => {
            setIsModalOpen(false);
            setEditingEntry(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
