import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import SearchBar from '@/app/search-bar';
import SignOutButton from "./SignOutButton";
import Button from '../Button';
import { createServerSupabaseClient } from '@/app/supabase-server';
import s from './Navbar.module.css';

const DropDownMenuForm = async() => {
    const supabase = createServerSupabaseClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger  className={s.link} aria-label='Menu'>Options</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    <Link href='/dashboard' className={s.link} aria-label='Limits'>Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuLabel aria-label='Search'>Search:</DropdownMenuLabel>
                    <SearchBar />
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href='/limits' className={s.link} aria-label='Limits'>
                        Limits
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                {user ? (
                <SignOutButton />
                ) : (
                <Link href="/signin" className={s.link}>
                    Sign in
                </Link>
                )}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenuForm;