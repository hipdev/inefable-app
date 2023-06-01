import { Tabs, useRouter, useSegments } from 'expo-router'

import { HelpCircle, LogIn } from 'lucide-react-native'
import { useAuthStore } from '../../components/stores/auth'
import { useEffect } from 'react'

export default function Layout() {
  const { user } = useAuthStore()

  const router = useRouter()
  const segments = useSegments()

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [segments, user])

  return (
    <Tabs>
      {/* Start no authenticated routes */}
      <Tabs.Screen
        name='home'
        options={{
          title: 'Index',
          tabBarIcon: () => <LogIn />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='new-post'
        options={{
          title: 'New Post',
          tabBarIcon: () => <HelpCircle />,
          headerShown: false,
        }}
      />
      {/* End no authenticated routes */}
    </Tabs>
  )
}
