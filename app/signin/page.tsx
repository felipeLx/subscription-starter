import { getSession } from '@/app/supabase-server';
import AuthUI from './AuthUI';

import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function SignIn() {
  const session = await getSession();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className="flex justify-center height-screen-helper">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
        <div className="flex justify-center pb-12 ">
        <Image 
              src='/logo-s.png' 
              alt='Latam Payments' 
              width={64} height={64} 
              className='rounded bg-inherit w-auto h-auto' security='https' 
              placeholder="blur"
              blurDataURL='/logo-s.png' />
        </div>
        <AuthUI />
      </div>
    </div>
  );
}
