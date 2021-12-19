import '../styles/globals.css'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, db } from '../firebase'
import { useRouter } from 'next/router'
import Login from './login'
import { useEffect } from 'react'
import firebase from 'firebase'
function MyApp({ Component, pageProps }) {
  const[user, loading]=useAuthState(auth)
  const router=useRouter()
  
  useEffect(async()=>{
    if(user===null){
      router.push('/login')
    }
    else {
      await db.collection('users').doc(user?.uid).set({
        email:user?.email,
        name:user?.displayName,
        lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        photoURL:user?.photoURL,
      },{merge:true})  
      router.push('/')
    }
   },[user])
  
  if(!user) return <Login/>
  return (
  <Component {...pageProps} />
  )
}

export default MyApp
