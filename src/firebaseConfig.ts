import * as firebasemodule from 'firebase' 
import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/analytics'

import { toast } from './toast';
require('firebase/auth')

const config = {
    apiKey: "AIzaSyBYoEP0uRwfXg7VuhIP9IHaR7Nm_DTDxs4",
    authDomain: "ionicreact-eeb6a.firebaseapp.com",
    databaseURL:"https://ionicreact-eeb6a-default-rtdb.firebaseio.com/",
    projectId: "ionicreact-eeb6a",
    storageBucket: "ionicreact-eeb6a.appspot.com",
    messagingSenderId: "636561258230",
    appId: "1:636561258230:web:064e19cf4c705df45aded7",
    measurementId: "G-0TSV9KCR1C"
}

firebase.initializeApp(config)

export async function loginUser(username: string, passowrd: string){
    const email = `${username}`
    
    try{
        const res = await firebase.auth().signInWithEmailAndPassword(username, passowrd)
        console.log(res)
        return res
    }catch(error)
    {
        console.log(error)
        toast( error.message, 4000)
        return false
    }

}

export async function registerUser(username: string, password: string){
    const email = `${username}  `;
    try{
          const res = await firebase.auth().createUserWithEmailAndPassword(username,password);
          console.log(res)
          
          return true
    }catch(error){
        console.log(error)
        toast( error.message, 4000)
        return false
    }
}

export async function getCurrentUser() {
    return new Promise((resolve,reject)=>{
    const unsubscribe = firebase.auth().onAuthStateChanged(function(user){
        if(user){
            resolve(user)
        } else{
            resolve(null)
        }
        unsubscribe()
    })
})
}

export async function displayCurrentUser() {
  let user = firebase.auth().currentUser
  return user?.email
}

export async function logoutUser() {
    // let user = firebase.auth().currentUser
    return firebase.auth().signOut()
  }
  

export default firebase