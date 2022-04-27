import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';
import React, { useState } from 'react'
import MainScreen from './Components/MainScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'BebasNeue-Regular': require('./assets/BebasNeue-Regular.ttf'),
  })
  const [loading, setLoading] = useState(true)

  if(!fontsLoaded) {
      return null
  }

  return (
      <MainScreen
      />
  )
}

registerRootComponent(App)