'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectWithEntries } from '@/types';
import EntryCard from '@/components/feed/EntryCard';

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<ProjectWithEntries | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        const data = await response.json();
        if (response.ok) {
          setProject(data.project);
        } else {
          router.push('/dashboard/projects');
        }
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="spinner" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient mb-2">{project.name}</h1>
          <p className="text-foreground-secondary">{project.description}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push('/dashboard/create')}
            className="btn btn-primary"
          >
            Add Entry
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {project.entries.length > 0 ? (
          project.entries.map((entry) => (
            <EntryCard 
              key={entry.id} 
              entry={{
                ...entry,
                user: { id: '', name: '', email: '' }, // User info not needed here as it's the current user's project
                project: { id: project.id, name: project.name }
              }} 
            />
          ))
        ) : (
          <div className="text-center py-12 bg-surface rounded-xl border border-border">
            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-foreground-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground">No entries yet</h3>
            <p className="text-foreground-secondary mt-2">
              Add your first code snippet or markdown document to this project
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
