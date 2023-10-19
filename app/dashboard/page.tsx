import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { getCountries } from '@/app/supabase-server';

export default async function Dashboard() {
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
