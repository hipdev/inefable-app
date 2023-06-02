import { Stack } from 'expo-router'
import { AuthContextProvider } from '../components/common/AuthContext'

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack />
    </AuthContextProvider>
  )
}
