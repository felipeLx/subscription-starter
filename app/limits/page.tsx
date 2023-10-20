import { redirect } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { getSubscription } from '@/app/supabase-server';
import { getLimits, getUserDetails } from "@/app/supabase-server";

interface Limits {
    id: string | null | undefined;
    type: string | null | undefined;
    symbol: string | null | undefined;
    limits: string | null | undefined;
    information: string | null | undefined;
    bank_id: string | null | undefined;
    country?: {
      id: string | null | undefined;
      country: string | null | undefined;
      flag: string | null | undefined;
    };
    bank?: {
      id: string | null;
      name: string | null;
      country_id: string | null;
    };
};

export default async function Limits() {
    const [subscription] = await Promise.all([
        getSubscription()
      ]);
    const user = await getUserDetails();
    
    if(!subscription) return redirect('/account');
    if(!user) {
        return redirect('/sign-in');
    }
    
    let data: Limits[] | null | undefined = await getLimits();
    
    return(
        <>
            <Table>
                <TableHeader>
                    <TableRow  className="w-full text-center font-bold justify-center items-center">
                    <TableHead className="w-[100px] text-center font-bold">Country</TableHead>
                    <TableHead className="text-center font-bold">Bank</TableHead>
                    <TableHead className="text-center font-bold">Method</TableHead>
                    <TableHead className="text-center font-bold">Limits</TableHead>
                    <TableHead className="text-center font-bold">Information</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.map((pmt: any) =>
                       <TableRow key={pmt.id}>
                                <TableCell className="font-medium">{pmt.country.country}</TableCell>
                                <TableCell>{pmt.banks.name}</TableCell>
                                <TableCell>{pmt.type}</TableCell>
                                <TableCell>{pmt.limits}</TableCell>
                                <TableCell className="text-right">{pmt.information}</TableCell>
                            </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}