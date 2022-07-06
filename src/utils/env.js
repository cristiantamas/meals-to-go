const localHost = 'http://localhost:5001/mealstogo-2730f/us-central1'
const liveHost = 'https://us-central1-mealstogo-2730f.cloudfunctions.net'

export const isDevelopment = process.env.NODE_ENV === 'development'
export const host = isDevelopment ? localHost : liveHost
