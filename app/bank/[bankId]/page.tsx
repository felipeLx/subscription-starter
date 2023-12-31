import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { createServerSupabaseClient, getMethods, getSubscriptionById } from '@/app/supabase-server';

type Params = {
  params: {
      bankId: string
  }
}
export default async function Bank({ params: { bankId } }: Params) {
  const supabase = createServerSupabaseClient();
  const {
      data: { user }
  } = await supabase.auth.getUser();
  const subscribed = await getSubscriptionById(user?.id ? user.id : '');
  if(!subscribed) return redirect('/account');
  
  if (!user) {
    return redirect('/sign-in');
  }

  let fetchedMethods = await getMethods();
  let methods = fetchedMethods?.filter(dt => dt.bank_id === bankId);

  return (
    <div className="mt-10 pt-10 flex w-full flex-wrap justify-around items-start">
      {methods && methods.map((ct, index) => 
      <Link key={index} href={`/method/${ct.id}`}>
      <Card className='flex flex-wrap bg-[#126E82] m-4 p-4 text-center w-96 text-white justify-center'>
          <CardHeader>
          <CardTitle>{ct.type}</CardTitle>
          <CardDescription className="text-white">Limite {ct.limits}</CardDescription>
          </CardHeader>
          <CardContent className="justify-center">
            <p className='text-justify px-4'>{ct.information}</p>
            <Image
                className="pt-2 rounded-sm object-cover object-center"
                src={ct?.symbol}
                alt={ct.type}
                width={400}
                height={400}
                security='https'
                placeholder="blur"
                blurDataURL={ct?.symbol}
            />
          </CardContent>
      </Card>
      </Link>
      )}
    </div>
  )
}
