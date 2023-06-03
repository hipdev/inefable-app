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

export default function AlarmScreen() {
  const { user } = useAuthStore()
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
        <ScrollView className='mx-8 mt-3 flex-1' keyboardDismissMode='on-drag'>
          <Text className='mt-4 text-center text-4xl font-medium capitalize text-black/80'>
            {currentMonthAndDay}
          </Text>

          <View className='mt-5 h-10 flex-1 border-b border-black/50'>
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
                  autoCapitalize='words'
                />
              )}
            />
          </View>
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
  )
}
