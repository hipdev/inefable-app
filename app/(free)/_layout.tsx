import { Stack, Tabs } from 'expo-router'

import { HelpCircle, LogIn } from 'lucide-react-native'

export default function Layout() {
  return (
    <>
      <Stack.Screen options={{ title: 'Overview', headerShown: false }} />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#AC66CC', //AC66CC
            paddingTop: 10,
            paddingBottom: 2,
          },
          tabBarLabelStyle: { color: 'white' },
        }}
      >
        {/* Start no authenticated routes */}
        <Tabs.Screen
          name='index'
          options={{
            title: 'Login',
            tabBarIcon: () => <LogIn color='white' />,
            headerShown: false,
          }}
        />

        <Tabs.Screen
          name='about'
          options={{
            title: 'Inefable?',
            tabBarIcon: () => <HelpCircle color='white' />,
            headerShown: false,
          }}
        />
        {/* End no authenticated routes */}
      </Tabs>
    </>
  )
}
