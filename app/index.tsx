import { Text, TouchableOpacity, View } from 'react-native'
import { Facebook, Twitter } from 'lucide-react-native'
import { AntDesign } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import supabase from '../lib/supabase'
import { useUser } from '../components/AuthContext'

export default function Home() {
  const { user } = useUser()

  const handleLogin = async () => {
    console.log('login')
    let redirectURL = Linking.createURL('/')

    let result = await supabase.auth.signInWithOtp({
      email: 'julianfullstackdev@gmail.com',
      options: {
        emailRedirectTo: redirectURL,
      },
    })

    console.log(redirectURL, 'url')

    if (result.error) {
      console.log(result.error)
      console.log(JSON.stringify(result))
    } else {
      console.log('success')
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  console.log('user', user)
  return (
    <View className='flex-1 items-center justify-center'>
      {/* <Link href='/diary'>Go to Details</Link> */}

      <View className='items-center'>
        <Text className='mb-20 text-4xl font-black'>Inefable</Text>

        <Text className='mb-3 text-xl'>You can enter with:</Text>

        <View className='flex-row space-x-2'>
          <TouchableOpacity className='flex-row items-center space-x-2 rounded-md bg-blue-400 px-3 py-2'>
            <Text className='text-lg text-white'> Twitter</Text>
            <Twitter color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            className='flex-row items-center space-x-2 rounded-md bg-red-500 px-3 py-2'
          >
            <Text className='text-lg text-white'> Google</Text>
            <AntDesign name='google' size={22} color='white' />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center space-x-2 rounded-md bg-blue-600 px-3 py-2'>
            <Text className='text-lg text-white'> Facebook</Text>
            <Facebook color='white' />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {user && (
          <TouchableOpacity className='mt-10' onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
