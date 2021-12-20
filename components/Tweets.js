import { useState, useEffect } from "react"
import Tweet from "./Tweet"
import { useAuthState } from "react-firebase-hooks/auth"
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase"


function Tweets() {
    const [user]=useAuthState(auth)
    const [tweetsSnapshot]=useCollection(db.collection('tweets').where('email', '==', user?.email))
    const [followingSnapshot]=useCollection(db.collection('users').doc(user?.uid).collection('following'))
    
    const [followingTweets, setFollwingTweets]=useState([])
    const [userTweets, setUserTweets]=useState([])
    const [tweets, setTweets]=useState([])

    useEffect(()=>{
        setUserTweets(tweetsSnapshot?.docs?.map(item=>item?.data()).sort((a,b)=>b?.postedAt - a?.postedAt))
    },[tweetsSnapshot])
    
    useEffect(()=>{
       const following=followingSnapshot?.docs?.map(item=>item?.data().email).sort((a,b)=>b?.postedAt - a?.postedAt)
       for(let i=0;i<following?.length;i++){
           let followedTweets=[]
            db.collection('tweets').where('email', '==', following[i]).onSnapshot((querySnapshot)=>{
                followedTweets.push(...querySnapshot?.docs?.map(item=>item?.data()))
                followedTweets.length>0 ? setFollwingTweets(followedTweets):setFollwingTweets([])
           })
       }
    },[followingSnapshot])
    
    useEffect(()=>{
        if(userTweets?.length>0 && followingTweets?.length>0){
            setTweets([...userTweets, ...followingTweets])
        }
        else if(userTweets?.length>0 && followingTweets?.length===0){
            setTweets(userTweets)
        }
        else if(userTweets?.length===0 && followingTweets?.length>0){
            setTweets(followingTweets)
        }
      
        
    },[userTweets, followingTweets, tweetsSnapshot, followingSnapshot, tweets])
    
    
    useEffect(()=>{
       const sorted=tweets?.sort((a,b)=>b?.postedAt?.toDate() - a?.postedAt?.toDate())
       setTweets(sorted)
    },[tweets])



 

    return (
        <div className="w-full ">
            {tweets.length>0 ? (
                tweets?.map((tweet)=>(
                    <Tweet key={tweet?.postedAt} name={tweet?.name}  postedAt={tweet?.postedAt} img={tweet?.img} tweet={tweet?.tweet} handle={tweet?.handle} />

            ))):(
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold">No Tweets</h3>
                    </div>
            )}
        </div>
    )
}

export default Tweets
