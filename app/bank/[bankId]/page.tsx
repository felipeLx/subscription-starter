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
import { getSession, getMethods } from '@/app/supabase-server';

type Params = {
  params: {
      bankId: string
  }
}
export default async function Bank({ params: { bankId } }: Params) {
  const session = await getSession();
  let fetchedMethods = await getMethods();
  let methods = fetchedMethods?.filter(dt => dt.bank_id === bankId);
  
  if (!session) {
    return redirect('/sign-in');
  }

  return (
    <div className="flex w-full flex-wrap justify-around items-start">
      {methods && methods.map((ct, index) => 
      <Link key={index} href={`/method/${ct.id}`}>
      <Card className='flex flex-wrap bg-[#126E82] m-4 p-4 text-center w-96 text-white justify-center'>
          <CardHeader>
          <CardTitle>{ct.type}</CardTitle>
          <CardDescription className="text-white">Limite {ct.limits}</CardDescription>
          </CardHeader>
          <CardContent className="justify-center">
            <p className='text-justify'>{ct.information}</p>
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
