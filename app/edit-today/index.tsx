import { Stack } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import useSWR from 'swr'

import { useAuthStore } from '@/components/stores/auth'
import { getToday } from '@/lib/db/stories'
import supabase from '@/lib/supabase'
import { currentMonthAndDay } from '@/lib/utils'

export default function EditPost() {
  const { user } = useAuthStore()
  const { data: todayData, mutate } = useSWR(
    user?.id ? ['getToday', user.id] : null,
    getToday
  )

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
    <>
      <Stack.Screen options={{ title: currentMonthAndDay }} />
      <SafeAreaView className='flex-1'>
        <KeyboardAvoidingView behavior='padding' className='flex-1'>
          <ScrollView
            className='mx-4 mt-3 flex-1'
            keyboardDismissMode='on-drag'
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View className='mt-5 flex-1 rounded-md border border-black/50 p-3'>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1 }}
                  keyboardShouldPersistTaps='never'
                >
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                      validate: (value) => value.length > 1,
                    }}
                    name='story'
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Hoy'
                        className='h-48 flex-1 overflow-y-scroll text-xl text-black/70'
                        inputMode='text'
                        placeholderTextColor={'#444'}
                        autoCapitalize='sentences'
                        multiline
                        autoCorrect
                      />
                    )}
                  />
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}
