import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useAuthStore } from '../../components/stores/auth'
import { Controller, useForm } from 'react-hook-form'
import { currentMonthAndDay } from '../../lib/utils'
import supabase from '../../lib/supabase'
import { TapGestureHandler } from 'react-native-gesture-handler'
import { useRouter } from 'expo-router'
import useSWR from 'swr'
import { createDiary, getToday } from '../../lib/db/stories'

export default function TodayScreen() {
  const { user } = useAuthStore()
  const router = useRouter()

  const { data: todayData } = useSWR(
    user?.id ? ['getToday', user.id] : null,
    getToday
  )

  console.log(todayData, 'today')

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const handleTitle = async ({ title }) => {
    if (!todayData) {
      const res = await createDiary({
        isTitle: true,
        userData: title,
        user_id: user.id,
      })
      console.log(res, 'res')
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
