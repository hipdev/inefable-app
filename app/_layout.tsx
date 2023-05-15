import { Stack, Tabs } from 'expo-router'
import { Edit3, ListPlus, LogIn } from 'lucide-react-native'

export default function Layout() {
  return (
    <Tabs>
      {/* The screens will now show up from left to right: index, settings, all other routes... */}
      <Tabs.Screen
        name='index'
        options={{ title: 'Login', tabBarIcon: () => <LogIn /> }}
      />
      <Tabs.Screen
        name='diary'
        options={{ title: 'Diario', tabBarIcon: () => <Edit3 /> }}
      />
      <Tabs.Screen
        name='alarm'
        options={{ title: 'Mas+', tabBarIcon: () => <ListPlus /> }}
      />
    </Tabs>
  )
}
