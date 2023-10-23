/* import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer } from '@/utils/supabase-admin';
import { getURL } from '@/utils/helpers';
import { Database } from '@/types_db';

export async function POST(req: Request) {
    const body = await req.json();
    if (req.method === 'POST') {
        try {
        const supabase = createRouteHandlerClient<Database>({cookies});
        const {
            data: { user }
          } = await supabase.auth.getUser();
        
        await supabase.from('users').upsert({
        id: user?.id as string,
        body.full_name,
        body.avatar_url
        })  

        } catch (err: any) {
        console.log(err);
        return new Response(
            JSON.stringify({ error: { statusCode: 500, message: err.message } }),
            {
            status: 500
            }
        );
        }
    }
}; */