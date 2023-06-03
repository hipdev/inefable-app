import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

export default function AlarmScreen() {
  const router = useRouter()

  const formattedDate = new Date().toLocaleDateString('es-CO', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='mx-8 mt-3'>
        <Text className='mt-4 text-center text-4xl font-medium capitalize text-black/80'>
          {formattedDate}
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
