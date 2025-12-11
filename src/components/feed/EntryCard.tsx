"use client";

import { useState } from "react";
import { EntryWithUser, EntryWithProject } from "@/types";
import { useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface EntryCardProps {
  entry: EntryWithUser & {
    project?: { id: string; name: string } | null;
    likeCount?: number;
    isLiked?: boolean;
  };
}

export default function EntryCard({ entry }: EntryCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(entry.isLiked || false);
  const [likeCount, setLikeCount] = useState(entry.likeCount || 0);
  const [isCopied, setIsCopied] = useState(false);

  // Truncate content for preview
  const previewContent =
    entry.content.length > 300 && !isExpanded
      ? entry.content.slice(0, 300) + "..."
      : entry.content;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(entry.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        // Unlike
        const response = await fetch(`/api/entries/${entry.id}/like`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (response.ok) {
          setIsLiked(false);
          setLikeCount(data.likeCount);
        }
      } else {
        // Like
        const response = await fetch(`/api/entries/${entry.id}/like`, {
          method: 'POST',
        });
        const data = await response.json();
        if (response.ok) {
          setIsLiked(true);
          setLikeCount(data.likeCount);
        }
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <div className="card card-hover mb-6 overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
              {entry.user.name?.[0] || entry.user.email[0]}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {entry.user.name || entry.user.email}
              </p>
              <p className="text-xs text-foreground-muted">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-gradient mt-2">
            {entry.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {entry.project && (
            <span className="px-2 py-1 rounded-full bg-surface border border-border text-xs text-foreground-secondary">
              {entry.project.name}
            </span>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              entry.type === "CODE"
                ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                : "bg-purple-500/10 text-purple-400 border-purple-500/20"
            }`}
          >
            {entry.type === "CODE" ? entry.language || "Code" : "Markdown"}
          </span>
        </div>
      </div>

      <div className="relative group">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 p-2 rounded-lg bg-background-secondary/80 backdrop-blur-sm border border-border hover:bg-surface transition-all opacity-0 group-hover:opacity-100"
          title="Copy content"
        >
          {isCopied ? (
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-foreground-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>

        <div
          className={`
          bg-background-secondary rounded-lg overflow-hidden border border-border
          ${!isExpanded ? "max-h-64" : ""}
        `}
        >
          {entry.type === "CODE" ? (
            <SyntaxHighlighter
              language={entry.language || "text"}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              showLineNumbers={true}
            >
              {previewContent}
            </SyntaxHighlighter>
          ) : (
            <div className="p-4 prose prose-invert max-w-none prose-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {previewContent}
              </ReactMarkdown>
            </div>
          )}

          {!isExpanded && entry.content.length > 300 && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background-secondary to-transparent flex items-end justify-center pb-4">
              <button
                onClick={() => setIsExpanded(true)}
                className="btn btn-secondary text-xs py-1 px-3 shadow-lg"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex gap-4">
          <button
            onClick={handleLike}
            className={`transition-colors text-sm flex items-center gap-1.5 ${
              isLiked
                ? 'text-red-500 hover:text-red-600'
                : 'text-foreground-secondary hover:text-red-500'
            }`}
          >
            <svg
              className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`}
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="font-medium">{likeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
