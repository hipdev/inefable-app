import { Redirect } from 'expo-router'
import { ReactElement } from 'react'
import { useAuthStore } from '../stores/auth'

export default function AuthWrapper({ children }: { children: ReactElement }) {
  const { user } = useAuthStore()

  if (!user) {
    // Redirect to the login screen if the user is not authenticated.
    return <Redirect href='/login' />
  }

  return children
}
