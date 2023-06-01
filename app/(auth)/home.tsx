import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import supabase from '../../lib/supabase'

export default function AlarmScreen() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }
  return (
    <View>
      {/* <Stack.Screen options={{ title: 'Overview', headerShown: false }} /> */}
      <Text
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.back()
        }}
      >
        Details Screen
      </Text>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Salir</Text>
      </TouchableOpacity>
    </View>
  )
}
