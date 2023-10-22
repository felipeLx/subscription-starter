'use client'
import { useCallback, useEffect, useState } from 'react'
import Avatar from './avatar'
import { Database } from '@/types_db'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import SignOutButton from '@/components/ui/Navbar/SignOutButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [billing_address, setBilling_address] = useState<string | null>(null)
  const [payment_method, setPayment_method] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  if(session === null) return null
  const user = session.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('users')
        .select(`full_name, avatar_url, billing_address, payment_method`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data?.full_name)
        setAvatarUrl(data?.avatar_url)
        setBilling_address(JSON.stringify(data?.billing_address))
        setPayment_method(JSON.stringify(data?.payment_method))
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    full_name,
    avatar_url,
    billing_address,
    payment_method
  }: {
    full_name: string | null
    avatar_url: string | null
    billing_address: string | null
    payment_method: string | null
  }) {
    try {
      setLoading(true)

      let billingJson = JSON.stringify(billing_address)
      let paymentJson = JSON.stringify(payment_method)
      let { error } = await supabase.from('users').upsert({
        id: user?.id as string,
        full_name,
        avatar_url,
        billingJson,
        paymentJson
      })
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex w-3/4 justify-center items-center'>
      <div className="flex flex-col space-y-4 items-start justify-center text-xl">
        <Avatar
          uid={user!.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ fullname, avatar_url: url, billing_address, payment_method })
          }}
        />
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" value={session?.user.email} disabled />
        </div>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            value={fullname || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="username">Billing Address</Label>
          <Input
            id="billingAddress"
            className='text-black'
            type="text"
            value={billing_address || ''}
            onChange={(e) => setBilling_address(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="website">Payment Methods</Label>
          <Input
            id="paymentMethod"
            className='text-black'
            type="url"
            value={payment_method || ''}
            onChange={(e) => setPayment_method(e.target.value)}
          />
        </div>

        <div>
          <button
            className="flex items-center justify-center border-none transition hover:scale-105 active:scale-95 bg-[#444444]"
            onClick={() => updateProfile({ fullname, avatar_url, billing_address, payment_method })}
            disabled={loading}
          >
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <SignOutButton />
        </div>
      </div>
    </div>
  )
}