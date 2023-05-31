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
import { Controller, useForm } from 'react-hook-form'
import { Redirect } from 'expo-router'

export default function Home() {
  const { user } = useUser()
  const [success, setSuccess] = useState(false)

  if (user) {
    // Redirect to the login screen if the user is not authenticated.
    return <Redirect href='/' />
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const inputRef = useRef(null)

  const handleLogin = async ({ email }) => {
    console.log(email, 'email')
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

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

        <Text className='mb-3 text-xl'>Obtener un link mágico de ingreso</Text>
        <View className='mx-8 flex-row rounded-md border border-black/50 pb-2.5'>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value.toLowerCase())}
                value={value}
                placeholder='add your email'
                className='h-9 flex-1 text-lg'
                textAlign='center'
                inputMode='email'
                placeholderTextColor={'#444'}
                autoCapitalize='none'
                ref={inputRef}
              />
            )}
          />
        </View>
        {errors.email && (
          <View className='mt-0.5 flex-row'>
            <Text className='mx-8 flex-1 text-right text-red-500'>
              Añade un email válido
            </Text>
          </View>
        )}

        <View className='mt-4 flex-row space-x-2'>
          <TouchableOpacity
            onPress={() => handleSubmit(handleLogin)()}
            className='flex-row items-center space-x-2 rounded-md bg-primary px-3 py-2'
          >
            <Text className='text-lg text-white'>Obtener link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {success && (
        <View className='mt-4'>
          <Text className='text-lg font-medium text-black/90'>
            Te acabo de envíar un link mágico para entrar
          </Text>
        </View>
      )}
    </SafeAreaView>
  )
}
