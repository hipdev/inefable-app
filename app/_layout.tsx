import { Stack } from 'expo-router'
import { AuthContextProvider } from '../components/common/AuthContext'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { SWRConfig } from 'swr'
import { AppState } from 'react-native'

export default function Layout() {
  return (
    <SWRConfig
      value={{
        isOnline() {
          /* Customize the network state detector */
          return true
        },
        fetcher: (url) =>
          fetch(url, { method: 'GET' }).then((res) => res.json()),
        isVisible() {
          /* Customize the visibility state detector */
          return true
        },
        initFocus(callback) {
          let appState = AppState.currentState

          const onAppStateChange = (nextAppState) => {
            /* If it's resuming from background or inactive mode to active one */
            if (
              appState.match(/inactive|background/) &&
              nextAppState === 'active'
            ) {
              callback()
            }
            appState = nextAppState
          }

          // Subscribe to the app state change events
          const subscription = AppState.addEventListener(
            'change',
            onAppStateChange
          )

          return () => {
            subscription.remove()
          }
        },
        initReconnect(callback) {
          /* Register the listener with your state provider */
        },
      }}
    >
      <AuthContextProvider>
        <Stack />
        <StatusBar style='dark' />
      </AuthContextProvider>
    </SWRConfig>
  )
}
