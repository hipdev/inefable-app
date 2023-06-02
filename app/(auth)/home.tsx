import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import supabase from '../../lib/supabase'
import { TextInput } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { Send } from 'lucide-react-native'
import * as Progress from 'react-native-progress'
import { useAuthStore } from '../../components/stores/auth'

export default function HomeScreen() {
  const { user } = useAuthStore()
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

    // Add user to admin table
    const { data, error } = await supabase.auth.updateUser({
      data: { name },
    })

    if (!error) {
      const { data, error } = await supabase
        .from('profiles')
        .insert([{ user_id: user.id, name }])
    }

    // add user to profiles table

    console.log('data', data, error)
  }

  console.log('user', user)
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
          {isSubmitting ? (
            <Progress.Circle size={28} indeterminate={true} color='#AC66CC' />
          ) : (
            <TouchableOpacity
              disabled={isSubmitting}
              onPress={() => handleSubmit(handleName)()}
            >
              <Send size={28} color='#444' />
            </TouchableOpacity>
          )}
        </View>
        <Text className='mt-7 text-lg'>
          Toda tu información viaja segura, aún así, procura no guardar nada
          bancario aquí, no esta permitido. Inefable es una app segura, pero no
          es un banco. {'\n'}
          Solo tu tienes acceso a toda tu información, no se comparte con nadie.
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text className=' mt-10 text-2xl'>Salir</Text>
        </TouchableOpacity>

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
