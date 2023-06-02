import { Stack, Tabs, useRouter, useSegments } from 'expo-router'

import { HelpCircle, Home, List, LogIn, Plus } from 'lucide-react-native'
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
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#590696', //AC66CC
            paddingTop: 10,
            paddingBottom: 2,
          },
          tabBarLabelStyle: { color: 'white' },
        }}
      >
        {/* Start no authenticated routes */}
        <Tabs.Screen
          name='home'
          options={{
            title: 'Diario',
            tabBarIcon: () => <Home color='white' />,
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name='new-post'
          options={{
            title: 'Hoy',
            tabBarIcon: () => <Plus color='white' />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name='more'
          options={{
            title: 'Más',
            tabBarIcon: () => <List color='white' />,
            headerShown: false,
          }}
        />
        {/* End no authenticated routes */}
      </Tabs>
    </>
  )
}
