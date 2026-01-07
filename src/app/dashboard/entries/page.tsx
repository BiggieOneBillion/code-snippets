import EntriesManager from '@/components/entries/EntriesManager';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function EntriesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return( <div className='ml-[10rem]'>
<EntriesManager />
  </div>);
  
}
