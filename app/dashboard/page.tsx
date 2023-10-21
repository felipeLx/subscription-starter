import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { createServerSupabaseClient, getCountries, getSubscriptionById } from '@/app/supabase-server';
import { redirect } from 'next/navigation';
import { AuthError, AuthUser, Session, User } from '@supabase/supabase-js';
export default async function Dashboard() {
  
  const supabase = createServerSupabaseClient();
  let { data: { session } } = await supabase.auth.getSession();
  let userJwt = session?.provider_token
  if(!userJwt) {
    await supabase.auth.signOut();
  }
  const {
      data: { user }
  } = await supabase.auth.getUser();
  async function logoutOthers() {
    await supabase.auth.signOut({scope: 'others'});
    return;
  }
  if(session) {
    logoutOthers();
  }

  const subscribed = await getSubscriptionById(user?.id ? user.id : '');
  if(!subscribed) return redirect('/account');

  let countries = await getCountries();

  return (
    <>
      <div className="flex w-full flex-wrap justify-around items-start">
        {countries && countries.map((ct) => 
        <Link key={ct.id} href={`/country/${ct.id}`} >
          <Card className='flex flex-col bg-[#126E82] m-4 p-4 text-center'>
            <CardHeader>
              <CardTitle>{ct.country}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                  className="rounded-sm h-48 w-48 object-cover object-center"
                  src={ct.flag}
                  alt={ct.country}
                  width={400}
                  height={400}
                  security='https'
                  placeholder="blur"
                  blurDataURL={ct.flag}
                />
            </CardContent>
          </Card>
        </Link>
        )}
      </div>
    </>
  )
}
