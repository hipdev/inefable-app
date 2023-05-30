import { Tabs } from 'expo-router'
import { Edit3, ListPlus, LogIn } from 'lucide-react-native'
import { AuthContextProvider } from '../components/AuthContext'

export default function Layout() {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  )
}
