import FeedList from '@/components/feed/FeedList';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gradient mb-2">
          Community Feed
        </h1>
        <p className="text-sm md:text-base text-foreground-secondary">
          Discover code snippets and documentation from the community
        </p>
      </div>

      <FeedList />
    </div>
  );
}
