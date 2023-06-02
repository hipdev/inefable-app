import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import { useRouter } from 'expo-router'
import supabase from '../../lib/supabase'
import { TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Save, Send } from 'lucide-react-native'

export default function HomeScreen() {
  const router = useRouter()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  const handleName = async ({ name }) => {
    console.log('name', name)
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('finish')
        resolve()
      }, 5000)
    })
  }
  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='mx-8 mt-10'>
        <Text className='text-4xl text-black/80'>
          Hola, antes de empezar, me gustaría saber tu nombre
        </Text>
        <View className='mt-3 flex-row items-center space-x-4 pb-2.5'>
          <View className='h-10 flex-1 border-b border-black/50'>
            <Controller
              control={control}
              rules={{
                required: true,
                validate: (value) => value.length > 1,
              }}
              name='name'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder='...'
                  className='h-9 flex-1 text-3xl text-primary'
                  inputMode='text'
                  placeholderTextColor={'#444'}
                  autoCapitalize='words'
                />
              )}
            />
          </View>
          <TouchableOpacity
            disabled={isSubmitting}
            onPress={() => handleSubmit(handleName)()}
          >
            <Send size={28} color='#444' />
          </TouchableOpacity>
        </View>
        <Text className='mt-7 text-lg'>
          Toda tu información viaja segura, aún así, procura no guardar nada
          bancario aquí, no esta permitido. Inefable es una app segura, pero no
          es un banco. {'\n'}
          Solo tu tienes acceso a toda tu información, no se comparte con nadie.
        </Text>

        <Text className='mt-4 text-lg font-medium text-black/80'>
          ¿Sabías que?
        </Text>
        <Text className='text-base text-black/80'>
          Escribir en un diario es una experiencia terapeutica porque te ayuda a
          liberar estrés, según un estudio de la Universidad de Texas. Nos
          emociona mucho que vas a empezar a escribir en tu diario, esperamos
          que te guste.
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
