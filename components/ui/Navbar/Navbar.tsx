import Link from 'next/link';
import { createServerSupabaseClient } from '@/app/supabase-server';
import Image from 'next/image';
import Logo from '@/components/icons/Logo';
// import SignOutButton from './SignOutButton';

import s from './Navbar.module.css';
import DropDownMenuForm from './DropDownMenuForm';

export default async function Navbar() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <div className="relative flex flex-row justify-between py-1 align-center md:py-1">
          <div className="flex items-center">
            <Link href="/" className={s.logo} aria-label="Logo">
            <Image 
              src='/logo.png' 
              alt='Latam Payments' 
              width={200} height={100} 
              className='rounded bg-inherit w-auto h-auto' security='https' 
              placeholder="blur"
              blurDataURL='/logo.png' />
            </Link>
            </div>
          <div className="flex justify-end space-x-8">
            <DropDownMenuForm />
          </div>
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