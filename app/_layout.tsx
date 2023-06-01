import { Stack } from 'expo-router'
import { AuthContextProvider } from '../components/AuthContext'
import TabsLayout from '../components/Tabs'

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack />
    </AuthContextProvider>
  )
}
