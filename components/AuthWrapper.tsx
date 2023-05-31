import { useUser } from '../components/AuthContext'
import { Redirect } from 'expo-router'
import { ReactElement } from 'react'

export default function AuthWrapper({ children }: { children: ReactElement }) {
  const { user } = useUser()

  if (!user) {
    // Redirect to the login screen if the user is not authenticated.
    return <Redirect href='/login' />
  }

  return children
}
