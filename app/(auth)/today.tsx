import { useRouter } from 'expo-router'
import { debounce } from 'lodash'
import { Pencil } from 'lucide-react-native'
import { Controller, useForm } from 'react-hook-form'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { TapGestureHandler } from 'react-native-gesture-handler'
import useSWR from 'swr'

import { useAuthStore } from '@/components/stores/auth'
import { createDiary, getToday, updateDiary } from '@/lib/db/stories'
import { currentMonthAndDay, successToast } from '@/lib/utils'

export default function TodayScreen() {
  const { user } = useAuthStore()
  const router = useRouter()

  const { data: todayData, mutate } = useSWR(
    user?.id ? ['getToday', user.id] : null,
    getToday
  )

  const { control } = useForm()
  const debouncedSaveTitle = debounce(async (title) => {
    // if there is no diary, we create it
    if (!todayData) {
      const res = await createDiary({
        isTitle: true,
        formData: title,
        user_id: user.id,
      })

      if (res.ok) {
        successToast()
        mutate()
      }

      if (res.error) {
        console.error(res.error, 'error')
      }
    }

    // There is a diary, so we update it
    const res = await updateDiary({
      isTitle: true,
      formData: title,
      story_id: todayData.id,
    })

    if (res.ok) {
      successToast({ isUpdate: true })
      mutate()
    }
  }, 1500)

  console.log(todayData, 'today')

  return (
    <SafeAreaView className='flex-1 relative'>
      {/* Floating button */}
      <TouchableOpacity
        onPress={() => router.push('/edit-today')}
        className='absolute bottom-20 right-8 bg-black/10 p-3 rounded-full z-10'
      >
        <View>
          <Pencil size={24} color='black' />
        </View>
      </TouchableOpacity>

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
                    onChangeText={(text) => {
                      onChange(text)
                      debouncedSaveTitle(text)
                    }}
                    value={value}
                    defaultValue={todayData?.title || ''}
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
                {todayData?.diary
                  ? todayData.diary
                  : 'Para escribir puedes dar un doble tap a este texto o presionar el boton de editar en la esquina inferior derecha.'}
              </Text>
            </TapGestureHandler>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
