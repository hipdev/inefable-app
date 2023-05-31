import { Tabs } from 'expo-router'
import { Edit3, HelpCircle, Home, LogIn } from 'lucide-react-native'
import { AuthContextProvider, useUser } from '../components/AuthContext'

export default function Layout() {
  const { user } = useUser()
  console.log(user, 'user layout')

  return (
    <AuthContextProvider>
      <Tabs>
        {/* The screens will now show up from left to right: index, settings, all other routes... */}
        <Tabs.Screen
          name='login'
          options={{
            title: 'Login',
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

        <Tabs.Screen
          name='index'
          options={{
            title: 'Diario',
            tabBarIcon: () => <Home />,
            headerShown: false,
            ...(!user && { href: null }),
          }}
        />

        <Tabs.Screen
          name='diary'
          options={{
            title: '',
            tabBarIcon: () => <Edit3 />,
            href: user,
            ...(!user && { href: null }),
          }}
        />
        <Tabs.Screen
          name='alarm'
          options={{
            title: '',
            tabBarIcon: () => <Edit3 />,
            href: user,
            ...(!user && { href: null }),
          }}
        />
      </Tabs>
    </AuthContextProvider>
  )
}
