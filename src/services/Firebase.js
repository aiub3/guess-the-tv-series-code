import firebase from 'firebase/app'
require('firebase/auth')
require('firebase/database')

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBlm6SfZOff7o27CnNAU5PCof2NKQkhYQI',
  authDomain: 'guess-the-tv-series.firebaseapp.com',
  databaseURL: 'https://guess-the-tv-series.firebaseio.com',
  projectId: 'guess-the-tv-series',
  storageBucket: 'guess-the-tv-series.appspot.com',
  messagingSenderId: '1028132529874',
  appId: '1:1028132529874:web:40894bfaa9e74b86fc2f0b'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export function signUpUser({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export function signInUser({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function signOutUser() {
  return firebase.auth().signOut()
}

export function checkAuthChange(fnToExecute) {
  return firebase.auth().onAuthStateChanged(fnToExecute)
}

export function addUserToDb(userId, user) {
  return firebase
    .database()
    .ref('users/' + userId)
    .set(user)
}

export function getUserFromDb(userId) {
  return firebase
    .database()
    .ref('users/' + userId)
    .once('value')
}

export function updateUserInDb(userId, newUserData) {
  return firebase
    .database()
    .ref('users')
    .child(userId)
    .update(newUserData)
}

export function getAllUsers() {
  return firebase
    .database()
    .ref('users')
    .once('value')
}
