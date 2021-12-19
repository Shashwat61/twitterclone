import Head from "next/head"
import Image from "next/image"
import twitter from '../assets/twitter.png'
import { auth, provider } from "../firebase"
function Login() {
    function signIn(){

      auth.signInWithPopup(provider).catch(err=>console.log(err))
    }
    return (
        <div className="grid h-screen place-items-center bg-bgchat">
        <Head>
            <title>Login</title>
        </Head>
        <div className="grid p-10 rounded-md sm:p-16 place-items-center bg-graylight drop-shadow-lg">
        <Image className="rounded-full" height="200px" width="200px" src={twitter} alt=""/>
       <button onClick={signIn} className="px-4 py-2 mt-6 text-sm rounded-md  cursor-pointer sm:text-base bg-blue-400 hover:opacity-80 focus:outline-none">Sign In With Google</button> 
        </div>
    </div>
    )
}

export default Login
