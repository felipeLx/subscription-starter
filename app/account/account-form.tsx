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
  const [full_name, setFullname] = useState<string | null>(null)
  //const [billing_address, setBilling_address] = useState<string | null>(null)
  //const [payment_method, setPayment_method] = useState<string | null>(null)
  const [avatar_url, setAvatarUrl] = useState<string | null>(null)
  if(session === null) return null
  const user = session.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('users')
        .select(`full_name, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data?.full_name)
        setAvatarUrl(data?.avatar_url)
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
    avatar_url
  }: {
    full_name: string | null
    avatar_url: string | null
  }) {
    
    console.log('userid', user?.id)
    console.log('avatar_url', avatar_url)
    try {
      setLoading(true)

      let { error } = await supabase.from('users').upsert({
        id: user?.id as string,
        full_name,
        avatar_url
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
            updateProfile({ full_name, avatar_url: url })
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
            value={full_name || ''}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <button
            className="flex items-center justify-center border-none transition hover:scale-105 active:scale-95 bg-[#444444]"
            onClick={() => updateProfile({ full_name, avatar_url })}
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