'use client';

import { useState, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  type: 'CODE' | 'MARKDOWN';
}

export default function CodeEditor({ value, onChange, language, type }: CodeEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className="h-[600px] flex flex-col border border-border rounded-lg overflow-hidden bg-[#1e1e1e]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-border">
        <span className="text-xs text-foreground-secondary font-mono">
          {type === 'CODE' ? `${language} snippet` : 'Markdown document'}
        </span>
        {type === 'MARKDOWN' && (
          <div className="flex bg-background-tertiary rounded-lg p-1">
            <button
              onClick={() => setIsPreview(false)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                !isPreview ? 'bg-primary text-white' : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              Edit
            </button>
            <button
              onClick={() => setIsPreview(true)}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                isPreview ? 'bg-primary text-white' : 'text-foreground-secondary hover:text-foreground'
              }`}
            >
              Preview
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        {type === 'MARKDOWN' && isPreview ? (
          <div className="absolute inset-0 overflow-auto p-8 bg-background prose prose-invert max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({node, inline, className, children, ...props}: any) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {value}
            </ReactMarkdown>
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            value={value}
            onChange={onChange}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
}
