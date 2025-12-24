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
    //adjust feed to be centered according to design
    <div className="max-w-5xl mx-auto flex items-center justify-center flex-col">
      <div className="mb-6 md:mb-8 text-left w-full px-4 md:px-0 md:ml-[18rem]">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
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
