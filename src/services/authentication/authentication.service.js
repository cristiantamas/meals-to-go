import * as firebase from 'firebase'

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAxxOJZdLAVgM07tUKK1Kf1VS6myaCgYSE',
  authDomain: 'mealstogo-2730f.firebaseapp.com',
  projectId: 'mealstogo-2730f',
  storageBucket: 'mealstogo-2730f.appspot.com',
  messagingSenderId: '44213808924',
  appId: '1:44213808924:web:c52f03271e54e7ead694d9'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const loginRequest = (email, password) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

export const registerRequest = (email, password) =>
  firebase.auth().createUserWithEmailAndPassword(email, password)
