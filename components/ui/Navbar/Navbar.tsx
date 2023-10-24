import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/app/supabase-server';
import s from './Navbar.module.css';
import DropDownMenuForm from './DropDownMenuForm';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  
  return (
    <nav className={s.root}>
      <div className="max-w-6xl px-6 mx-auto mb-8">
        <div className="relative flex flex-row justify-between py-1 align-center md:py-1">
          <div className="flex items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
            <Image 
              src='/logo.png' 
              alt='Latam Banks' 
              width={80} height={80} 
              className='rounded bg-inherit w-auto h-auto' security='https' 
              placeholder="blur"
              blurDataURL='/logo.png' />
            </Link>
            </div>
          {user ? <div className="flex justify-end space-x-8">
            <DropDownMenuForm />
          </div> :
          <Link href="/signin" className={s.link}>
            Sign in
          </Link>
          }
        </div>
      </div>
    </nav>
  );
}
/*
<nav className="hidden ml-6 space-x-2 lg:block">
    <Link href="/dashboard" className={s.link}>
      Dashboard
    </Link>
    {user && (
      <Link href="/account" className={s.link}>
        Account
      </Link>
    )}
  </nav>

  {user ? (
        <SignOutButton />
      ) : (
        <Link href="/signin" className={s.link}>
          Sign in
        </Link>
      )}


  */