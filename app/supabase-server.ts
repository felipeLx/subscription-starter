import { Database } from '@/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscriptionById(id: string) {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['active'])
      .eq('user_id', id)
      .maybeSingle()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

interface Country {
  id: string;
  country: string;
  flag: string;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  countryId: string;
}

interface Methods {
  id: string;
  type: string;
  symbol: string;
  limits: string | null;
  information: string | null;
  bankId: string;
}

interface Steps {
  id: string;
  st1_pic: string | null;
  st1_text: string | null;
  st2_pic: string | null;
  st2_text: string | null;
  st3_pic: string | null;
  st3_text: string | null;
  st4_pic: string | null;
  st4_text: string | null;
  st5_pic: string | null;
  st5_text: string | null;
  st6_pic: string | null;
  st6_text: string | null;
  paymentId: string;
}

export const getBankById = async(name: string) => {
  if(typeof name !== 'string') return

  const supabase = createServerSupabaseClient();
  try {
    const { data: bank } = await supabase
      .from('banks')
      .select('*, countries(country)')
      .ilike('name', `%${name}%`)
    return bank ?? [];
  } catch (error) {
    console.log(error);
    return null
  }
};
/*
export const fetchDataByQuery = async(query: string) => {
  const countries: Array<Country> = await prisma.country.findMany({
    select: {
      id: true,
      country: true,
      flag: true,
      userId: true,
    },
    where: {
      country: {
        contains: query,
      },
    },
  });
  const banks: Array<Bank> = await prisma.bank.findMany({
    select: {
      id: true,
      name: true,
      logo: true,
      countryId: true
    },
    where: {
      name: {
        contains: query,
      },
    },
  })

  const methods: Array<Methods> = await prisma.payment.findMany({
    select: { id: true, type: true, symbol: true, limits: true, information: true, bankId: true},
    where: {
      type: {
        contains: query,
      },
    }
  })

  let queryResult = methods ? methods : banks ? banks : countries ? countries : [];
  return { queryResult }
};
*/
export const getCountries = async() => {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*');
  
    if (error) {
      console.log(error.message);
    }
    return data ?? [];
  } catch (error) {
    console.log(error);
    return null
  }
  
};

export const getBanks = async() => {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('banks')
      .select('*');
  
    if (error) {
      console.log(error.message);
    }
    return data ?? [];
  } catch (error) {
    console.log(error);
    return null
  }
};

export const getLimits = async() => {
  const supabase = createServerSupabaseClient();
  try {
    const { data: limits } = await supabase
      .from('payments')
      .select('*, banks(id, name, country_id)')
      .throwOnError();
    console.log('limits', limits);

    const { data: countries } = await supabase
      .from('countries')
      .select('*');
    
    const mergedData = limits?.map(limit => {
      const country = countries?.find(country => country.id === limit?.banks?.country_id);
      return {
        ...limit,
        country,
      };
    });
    return mergedData;
  } catch (error) {
    console.log(error);
    return null
  }
}

export const getMethods = async() => {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
    if (error) {
      console.log(error.message);
    }
    return data ?? [];
  } catch (error) {
    console.log(error);
    return null
  }
  
};

export const getSteps = async() => {
  const supabase = createServerSupabaseClient();
  try {
    const { data, error } = await supabase
      .from('steps')
      .select('*');
  
    if (error) {
      console.log(error.message);
    }
    return data ?? [];

  } catch (error) {
    console.log(error);
    return null
  }
};