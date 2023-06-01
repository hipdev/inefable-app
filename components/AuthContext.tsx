import { useEffect } from 'react'
import { useURL } from 'expo-linking'
import supabase from '../lib/supabase'
import { useAuthStore } from './stores/auth'

export const AuthContextProvider = ({ children }) => {
  const { setUser, setSession } = useAuthStore()

  const url = useURL()

  useEffect(() => {
    if (url) {
      const correctUrl = url.includes('#') ? url.replace('#', '?') : url
      const urlObject = new URL(correctUrl)
      const accessToken = urlObject.searchParams.get('access_token')
      const refreshToken = urlObject.searchParams.get('refresh_token')
      if (!refreshToken || !accessToken) return
      // bug fix, Buffer is used in the underlying lib, but is not imported
      global.Buffer = require('buffer').Buffer
      supabase.auth
        .setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        .then(({ data: { session } }) => {
          if (session) {
            // supabase.auth._notifyAllSubscribers('SIGNED_IN', session)
            console.log(session)
          }
        })
    }
  }, [url])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session here', session)
      setSession(session)
      setUser(session?.user ?? null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(session, 'session here 2')
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription
    }
  }, [url])

  return children
}
