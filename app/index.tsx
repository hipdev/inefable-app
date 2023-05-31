import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import * as Linking from 'expo-linking'
import supabase from '../lib/supabase'
import { useUser } from '../components/AuthContext'
import { useRef, useState } from 'react'

export default function Home() {
  const { user } = useUser()
  const [email, setEmail] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputRef = useRef(null)

  const handleLogin = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(email) === false || email == '') {
      setError(true)
      return
    }
    setError(false)

    inputRef.current.blur()

    let redirectURL = Linking.createURL('/')

    let result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: redirectURL,
      },
    })

    if (result.error) {
      console.log(JSON.stringify(result))
    } else {
      setSuccess(true)
    }
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  console.log('user', user)
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      {/* <Link href='/diary'>Go to Details</Link> */}

      <View className='items-center'>
        <Text className='mb-14 text-4xl font-black'>Inefable</Text>

        <Text className='mb-3 text-xl'>
          Get a magic link to your email to login
        </Text>
        <View className='mx-8 flex-row rounded-md border border-black/50 pb-2.5'>
          <TextInput
            ref={inputRef}
            placeholder='add your email'
            keyboardType='numeric'
            onChangeText={(value) => setEmail(value.toLowerCase())}
            value={email}
            className='h-9 flex-1 text-lg'
            textAlign='center'
            inputMode='email'
            autoCapitalize='none'
            autoCorrect={false}
            placeholderTextColor={'#444'}
          />
        </View>
        {error && (
          <View className='mt-0.5 flex-row'>
            <Text className='mx-8 flex-1 text-right text-red-500'>
              Please add a valid email
            </Text>
          </View>
        )}

        <View className='mt-4 flex-row space-x-2'>
          <TouchableOpacity
            onPress={handleLogin}
            className='flex-row items-center space-x-2 rounded-md bg-primary px-3 py-2'
          >
            <Text className='text-lg text-white'> Get magic link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {user && (
        <View>
          <TouchableOpacity className='mt-10' onPress={handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {success && (
        <View className='mt-4'>
          <Text className='text-lg font-medium text-black/90'>
            We send you a magical link, check spam too.
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
