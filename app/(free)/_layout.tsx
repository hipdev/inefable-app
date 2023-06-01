import { Tabs } from 'expo-router'

import { HelpCircle, LogIn } from 'lucide-react-native'

export default function Layout() {
  return (
    <Tabs>
      {/* Start no authenticated routes */}
      <Tabs.Screen
        name='index'
        options={{
          title: 'Index',
          tabBarIcon: () => <LogIn />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name='about'
        options={{
          title: 'Inefable?',
          tabBarIcon: () => <HelpCircle />,
          headerShown: false,
        }}
      />
      {/* End no authenticated routes */}
    </Tabs>
  )
}
