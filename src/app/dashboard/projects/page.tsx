import ProjectList from '@/components/projects/ProjectList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-6xl mx-auto">
      <ProjectList />
    </div>
  );
}
