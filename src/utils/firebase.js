import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyBQQdB0IcfoSWgNYnGcVD8IvOCHFkIBZAk',
  authDomain: 'bucket-wishes.firebaseapp.com',
  databaseURL: 'https://bucket-wishes.firebaseio.com',
  projectId: 'bucket-wishes',
  storageBucket: 'bucket-wishes.appspot.com',
  messagingSenderId: '677063529307',
  appId: '1:677063529307:web:e37005b8a303010102407e',
  measurementId: 'G-D0F437C5NG'
}

export const myFirebase = firebase.initializeApp(firebaseConfig)
export const db = firebase.firestore()
