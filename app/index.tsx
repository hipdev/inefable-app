import { Text, TouchableOpacity, View } from 'react-native'
import { Link, Stack } from 'expo-router'
import { Facebook, Twitter } from 'lucide-react-native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'

export default function Home() {
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
          <TouchableOpacity className='flex-row items-center space-x-2 rounded-md bg-red-500 px-3 py-2'>
            <Text className='text-lg text-white'> Google</Text>
            <AntDesign name='google' size={22} color='white' />
          </TouchableOpacity>
          <TouchableOpacity className='flex-row items-center space-x-2 rounded-md bg-blue-600 px-3 py-2'>
            <Text className='text-lg text-white'> Facebook</Text>
            <Facebook color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
