import { SafeAreaView, Text, View } from 'react-native'

import { useUser } from '../components/AuthContext'
import { Redirect } from 'expo-router'

export default function Home() {
  const { user } = useUser()

  if (!user) {
    // Redirect to the login screen if the user is not authenticated.
    return <Redirect href='/login' />
  }

  console.log('user', user)
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      {/* <Link href='/diary'>Go to Details</Link> */}

      <View className='items-center'>
        <Text className='mb-14 text-4xl font-black'>Inefable</Text>

        <Text className='mb-3 text-xl'>Obtener un link mágico de ingreso</Text>
        <View className='mx-8 flex-row rounded-md border border-black/50 pb-2.5'></View>
      </View>
    </SafeAreaView>
  )
}
