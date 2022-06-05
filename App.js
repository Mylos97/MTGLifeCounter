import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import { useKeepAwake } from 'expo-keep-awake';
import React from 'react'
import MainScreen from './Components/MainScreen';
import AppLoading from 'expo-app-loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./assets/BebasNeue-Regular.ttf'),
  })
  useKeepAwake()
  if(!fontsLoaded) {
      return <AppLoading />
  }

  return (
      <MainScreen
      />
  )
}

registerRootComponent(App)