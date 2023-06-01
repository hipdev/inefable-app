import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

import { Redirect, useRouter, useSegments } from 'expo-router'
import supabase from '../lib/supabase'
import { useAuthStore } from '../components/stores/auth'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)

    router.push('/login')
  }

  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      {/* <Link href='/diary'>Go to Details</Link> */}

      <View className='items-center'>
        <Text className='mb-14 text-4xl font-black'>Inefable</Text>

        <Text className='mb-3 text-xl'>Obtener un link mágico de ingreso</Text>
        <View className='mx-8 flex-row rounded-md border border-black/50 pb-2.5'></View>
      </View>

      <TouchableOpacity onPress={handleLogout}>
        <Text>salir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
