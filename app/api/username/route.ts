import { cookies } from 'next/headers';
import { createRouteHandlerClient, createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer } from '@/utils/supabase-admin';
import { getURL } from '@/utils/helpers';
import { Database } from '@/types_db';
import { getSession } from '@/app/supabase-server';
import { revalidatePath } from 'next/cache';

export async function PUT(req: Request) {
    if (req.method === 'PUT') {
        try {
            const supabase = createServerActionClient<Database>({ cookies });
            const session = await getSession();
            const fullName: any = req.body;
            const user: any = session?.user;
            console.log('fullName', fullName)
            const { error } = await supabase
              .from('users')
              .update({ full_name: fullName })
              .eq('id', user.id)
            if (error) {
              console.log(error);
            }
            return new Response(JSON.stringify('updated!'), {
                status: 200
            });
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
};
