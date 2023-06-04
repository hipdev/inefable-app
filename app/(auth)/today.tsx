import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import { useAuthStore } from '../../components/stores/auth'
import { Controller, useForm } from 'react-hook-form'
import { currentMonthAndDay } from '../../lib/utils'
import supabase from '../../lib/supabase'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'

export default function AlarmScreen() {
  const { user } = useAuthStore()
  const router = useRouter()
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const handlePost = async ({ name }) => {
    const { error } = await supabase.auth.updateUser({
      data: { name },
    })

    if (!error) {
      const { error } = await supabase
        .from('profiles')
        .insert([{ user_id: user.id, name }])

      if (!error) {
        reset({ name: '' })
      }
    }
  }

  return (
    <SafeAreaView className='flex-1'>
      <KeyboardAvoidingView behavior='padding' className='flex-1'>
        <ScrollView className='mx-4 mt-3 flex-1' keyboardDismissMode='on-drag'>
          <Text className='mt-4 text-center text-3xl font-medium capitalize text-black/80'>
            {currentMonthAndDay}
          </Text>

          <TouchableWithoutFeedback>
            <View className='mt-5 h-10 flex-1'>
              <Controller
                control={control}
                rules={{
                  required: true,
                  validate: (value) => value.length > 1,
                }}
                name='title'
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder='Titulo...(Opcional)'
                    className='h-9 flex-1 text-center text-xl text-primary'
                    inputMode='text'
                    placeholderTextColor={'#444'}
                    autoCapitalize='sentences'
                  />
                )}
              />
            </View>
          </TouchableWithoutFeedback>

          <View>
            <TapGestureHandler
              numberOfTaps={2}
              onActivated={() => router.push('/edit-today')}
            >
              <Text className='mt-5 text-lg'>
                When I push a page on top of the stack in tab 1 stack it goes
                inside the navigator and thus duplicates the header, I know I
                can hide the hide on one or the other but then every page will
                require conditional logic, {'\n'}
                {'\n'} whereas I just want the pushed page to be on top, ideally
                both without the tab bar and with its header, which would have
                the correct title and back button Please let me know if you want
                to make a different issue but I think these are interrelated
              </Text>
            </TapGestureHandler>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
