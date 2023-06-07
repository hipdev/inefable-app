import { isToday, parseISO } from 'date-fns'
import { Link, useRouter } from 'expo-router'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { useAuthStore } from '../../components/stores/auth'

export default function Diaries({ diaries }) {
  const { user } = useAuthStore()
  const router = useRouter()

  return (
    <View className='flex flex-row flex-wrap'>
      {diaries?.map((diary) => (
        <TouchableOpacity
          onPress={() => {
            if (isToday(parseISO(diary.date))) {
              router.push('/today')
            }
          }}
          key={diary.id}
          className='w-1/3 h-24  flex items-center justify-center p-0.5'
        >
          <View className='bg-black/20 w-full h-full items-center justify-center'>
            <Text className='text-lg text-black/80 font-bold'>
              {diary.date}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
}
