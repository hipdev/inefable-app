import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import supabase from '../../lib/supabase'
import { useAuthStore } from '../../components/stores/auth'
import AddName from '../../components/home/add-name'
import Welcome from '../../components/home/welcome'

export default function HomeScreen() {
  const { user } = useAuthStore()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='mx-8 mt-10'>
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
