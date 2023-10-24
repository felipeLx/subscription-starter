import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from "next/navigation";
import { createServerSupabaseClient, getBankById, getSubscriptionById } from '@/app/supabase-server';

type Params = {
    params: {
        bank: string
    }
};

interface Banks {
    id: string | null | undefined;
    name: string | null | undefined;
    logo: string | null | undefined;
    country_id: string | null | undefined;
    countries?: {
        country: string
    } | null | undefined
};

const SearchPage = async({ params: { bank } }: Params) => {
    const supabase = createServerSupabaseClient();
    const {
        data: { user }
    } = await supabase.auth.getUser();
    const subscribed = await getSubscriptionById(user?.id ? user.id : '');
    if(!subscribed) return redirect('/account');

    let bankName = bank;
    const data: Banks[] |null | undefined = await getBankById(bankName);
    
    if (!user) {
        return redirect('/sign-in');
    }

    if(!data) {
        return null;
    };

    return (
        <>
            <span className="flex flex-col mt-10 text-xl">
            Showing results for:{" "}
            <span className="font-semibold">{bankName}</span>
            </span>
            <div className="flex w-full flex-wrap justify-around items-start">
                {data ? data.map((ct) => 
                <Link key={ct.id} href={`/bank/${ct.id}`} className=''>
                <Card className='flex flex-col bg-[#126E82] m-4 p-4 text-center'>
                    <CardHeader>
                    <CardTitle className='text-sm'>{ct.countries?.country}{` > `}{ct.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <Image
                        className="rounded-sm h-48 w-48 object-cover object-center"
                        src={ct.logo ? ct.logo : ""}
                        alt={ct.name ? ct.name : ""}
                        width={400}
                        height={400}
                        security='https'
                        placeholder="blur"
                        blurDataURL={ct.logo ? ct.logo : ""}
                    />
                    </CardContent>
                </Card>
                </Link>
                ) : 
                <button type="button" className="bg-indigo-500 ..." disabled>
                    <svg className="motion-reduce:hidden animate-spin ..." viewBox="0 0 24 24"></svg>
                    Processing...
                </button>
                }
            </div>
        </>
    )
}

export default SearchPage;