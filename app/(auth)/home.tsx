import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import useSWR from 'swr'

import AddName from '@/components/home/add-name'
import Welcome from '@/components/home/welcome'
import { useAuthStore } from '@/components/stores/auth'
import { getDiaries } from '@/lib/db/stories'
import supabase from '@/lib/supabase'

export default function HomeScreen() {
  const { user } = useAuthStore()

  const { data: diaries, mutate } = useSWR(
    user?.id ? ['getStories', user.id] : null,
    getDiaries
  )

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  console.log(diaries, 'diaries')

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='mx-4 mt-10'>
        {!user?.user_metadata?.name ? <AddName /> : <Welcome />}

        {/* <Text className='mt-4 text-lg font-medium text-black/80'>
          ¿Sabías que?
        </Text>
        <Text className='text-base text-black/80'>
          Escribir en un diario es una experiencia terapeutica porque te ayuda a
          liberar estrés, según un estudio de la Universidad de Texas. Nos
          emociona mucho que vas a empezar a escribir en tu diario, esperamos
          que te guste.
        </Text> */}
      </ScrollView>
    </SafeAreaView>
  )
}
