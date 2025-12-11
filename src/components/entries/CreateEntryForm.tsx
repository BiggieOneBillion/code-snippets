'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CodeEditor from '@/components/editor/CodeEditor';
import { Project } from '@/types';

const LANGUAGES = [
  'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp', 
  'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'sql', 'html', 'css', 
  'json', 'yaml', 'markdown'
];

export default function CreateEntry() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'CODE' as 'CODE' | 'MARKDOWN',
    language: 'javascript',
    isPublic: true,
    projectId: '',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (response.ok) {
          setProjects(data.projects);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          language: formData.type === 'MARKDOWN' ? 'markdown' : formData.language,
          projectId: formData.projectId || null,
        }),
      });

      if (response.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      console.error('Failed to create entry:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gradient">Create New Entry</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                required
                className="input"
                placeholder="e.g., Awesome React Hook"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  className="input"
                  value={formData.type}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    type: e.target.value as 'CODE' | 'MARKDOWN',
                    language: e.target.value === 'MARKDOWN' ? 'markdown' : 'javascript'
                  })}
                >
                  <option value="CODE">Code Snippet</option>
                  <option value="MARKDOWN">Markdown Document</option>
                </select>
              </div>

              {formData.type === 'CODE' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Language</label>
                  <select
                    className="input"
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project (Optional)</label>
              <select
                className="input"
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              >
                <option value="">No Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            <div className="card bg-surface/50">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative inline-flex items-center">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-background-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </div>
                <span className="text-sm font-medium">
                  {formData.isPublic ? 'Public Visibility' : 'Private Visibility'}
                </span>
              </label>
              <p className="text-xs text-foreground-secondary mt-2">
                {formData.isPublic 
                  ? 'Anyone can see this entry in the public feed.' 
                  : 'Only you can see this entry.'}
              </p>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <CodeEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value || '' })}
            language={formData.language}
            type={formData.type}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary min-w-[120px]"
          >
            {isLoading ? 'Creating...' : 'Create Entry'}
          </button>
        </div>
      </form>
    </div>
  );
}
