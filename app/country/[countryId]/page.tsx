import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { createServerSupabaseClient, getBanks, getSubscriptionById } from '@/app/supabase-server';

type Params = {
  params: {
      countryId: string
  }
}

export default async function Country({ params: { countryId } }: Params) {
  const supabase = createServerSupabaseClient();
  const {
      data: { user }
  } = await supabase.auth.getUser();
  const subscribed = await getSubscriptionById(user?.id ? user.id : '');
  if(!subscribed) return redirect('/account');

  if (!user) {
    return redirect('/sign-in');
  }
  let fetchedBanks = await getBanks();
  let banks = fetchedBanks?.filter(dt => dt.country_id === countryId);
    
  return (
      <div className="flex w-full flex-wrap justify-around items-start">
        {banks && banks.map((ct, index) => 
        <Link key={index} href={`/bank/${ct.id}`} className=''>
        <Card className='flex flex-col bg-[#126E82] m-4 p-4 text-center w-64 h-80 text-white'>
            <CardHeader>
            <CardTitle>{ct.name}</CardTitle>
            </CardHeader>
            <CardContent>
            <Image
                className="rounded-sm object-fit object-center"
                src={ct.logo}
                alt={ct.name}
                width={400}
                height={400}
                security='https'
                placeholder="blur"
                blurDataURL={ct.logo}
            />
            </CardContent>
        </Card>
        </Link>
        )}
      </div>
    )
}
