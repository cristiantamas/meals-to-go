import { Platform } from 'react-native'
const localHost = 'http://localhost:5001/mealstogo-2730f/us-central1'
const liveHost = 'https://us-central1-mealstogo-2730f.cloudfunctions.net'

export const isAndroid = Platform.OS === 'android'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const isMock = true
export const host = !isDevelopment || isAndroid ? liveHost : localHost
