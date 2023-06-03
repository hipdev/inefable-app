import { Stack } from 'expo-router'
import { AuthContextProvider } from '../components/common/AuthContext'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function Layout() {
  return (
    <AuthContextProvider>
      <Stack />
      <StatusBar style='dark' />
    </AuthContextProvider>
  )
}
