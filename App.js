import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import React, { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'

import {
  useFonts as useOswald,
  Oswald_400Regular
} from '@expo-google-fonts/oswald'

import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato'

import { theme } from './src/infrastructure/theme'
import { Navigation } from './src/infrastructure/navigation/index'
import { AuthenticationContextProvider } from './src/services/authentication/authentication.context'

export default function App() {
  let [oswaldLoaded] = useOswald({
    Oswald_400Regular
  })

  let [latoLoaded] = useLato({
    Lato_400Regular
  })

  if (!oswaldLoaded || !latoLoaded) {
    return null
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  )
}
