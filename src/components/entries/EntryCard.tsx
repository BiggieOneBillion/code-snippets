'use client';

import { EntryWithProject } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface EntryCardProps {
  entry: EntryWithProject & { likeCount?: number };
  onEdit: (entry: EntryWithProject) => void;
  onDelete: (entryId: string) => void;
}

export default function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const getLanguageBadgeColor = (type: string, language?: string | null) => {
    if (type === 'MARKDOWN') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';

    const colors: { [key: string]: string } = {
      javascript: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      typescript: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      python: 'bg-green-500/10 text-green-400 border-green-500/20',
      java: 'bg-red-500/10 text-red-400 border-red-500/20',
      go: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      rust: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    };

    return colors[language || ''] || 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="card group hover:border-primary/30 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate mb-1">
            {entry.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${getLanguageBadgeColor(
                entry.type,
                entry.language
              )}`}
            >
              {entry.type === 'MARKDOWN' ? 'Markdown' : entry.language}
            </span>
            {entry.project && (
              <span className="text-xs text-foreground-secondary flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                {entry.project.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(entry)}
            className="p-1.5 rounded hover:bg-surface transition-colors"
            title="Edit"
          >
            <svg className="w-4 h-4 text-foreground-secondary hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="p-1.5 rounded hover:bg-surface transition-colors"
            title="Delete"
          >
            <svg className="w-4 h-4 text-foreground-secondary hover:text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Preview */}
      <div className="bg-background-secondary rounded-lg p-3 mb-3">
        <pre className="text-xs text-foreground-secondary font-mono overflow-hidden whitespace-pre-wrap break-words">
          {truncateContent(entry.content)}
        </pre>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-foreground-secondary">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}
          </span>
          {typeof entry.likeCount === 'number' && (
            <span className="flex items-center gap-1 text-red-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {entry.likeCount}
            </span>
          )}
        </div>
        <span className={`flex items-center gap-1 ${entry.isPublic ? 'text-green-400' : 'text-foreground-secondary'}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {entry.isPublic ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            )}
          </svg>
          {entry.isPublic ? 'Public' : 'Private'}
        </span>
      </div>
    </div>
  );
}
