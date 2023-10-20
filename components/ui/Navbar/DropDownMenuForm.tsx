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
import s from './Navbar.module.css';
import { createServerSupabaseClient, getSubscription, getSubscriptionById } from '@/app/supabase-server';

const DropDownMenuForm = async() => {
    const supabase = createServerSupabaseClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    const subscribed = await getSubscriptionById(user?.id ? user.id : '');

  if(!subscribed) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger  className={s.link} aria-label='Menu'>Options</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#126E82]'>
                <DropdownMenuItem>
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        )
    }
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger  className={s.link} aria-label='Menu'>Options</DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#126E82]'>
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
                    <SignOutButton />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default DropDownMenuForm;