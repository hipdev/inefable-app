import { View, Text } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import AuthWrapper from '../components/AuthWrapper'

export default function Details() {
  const router = useRouter()
  return (
    <AuthWrapper>
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
      </View>
    </AuthWrapper>
  )
}
