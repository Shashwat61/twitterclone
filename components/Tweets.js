import { useState, useEffect } from "react"
import Tweet from "./Tweet"
import { useAuthState } from "react-firebase-hooks/auth"
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase"

/* user first comes on main page 
if user has no tweets and no following
no user tweets no following tweets

user tweets 
usertweets show 
tweets -> usertweets
         
         user follows someone 
           following tweets 
tweets-> following tweets

user has tweets and following one 

tweets-> usertweets & followingtweets
*/

function Tweets() {
    const [user]=useAuthState(auth)
    const [tweetsSnapshot]=useCollection(db.collection('tweets').where('email', '==', user?.email))
    // console.log(tweetsSnapshot?.docs?.map(doc=> ))
    const [followingSnapshot]=useCollection(db.collection('users').doc(user?.uid).collection('following'))
    
    const [followingTweets, setFollowingTweets]=useState([])
    const [userTweets, setUserTweets]=useState([])
    const [tweets, setTweets]=useState([])


    useEffect(()=>{
        const usernewTweets=tweetsSnapshot?.docs?.map(doc=>doc?.data()).sort((a,b)=>b?.postedAt - a?.postedAt)
        setUserTweets(usernewTweets)
        const followingUsers=followingSnapshot?.docs?.map(doc=>doc?.data())
        // console.log(followingUsers,'followingusers')
        //getting users in real time updates
        // get post results one by one of each user and append it in one array 
        // sort the array by postedAt
        // problem is that the array is not updated when the user is following someone because setFollowingTweets is using callback and 
        // problem identified -> follwingTweets is in a callback and when all the sync code is done then this callback is pushed that's why its coming last 
        for(let i=0;i<followingUsers?.length;i++){
            // console.log('loop')
            db.collection('tweets').where('email', '==', followingUsers[i]?.email).onSnapshot((querySnapshot)=>{
                setFollowingTweets([...querySnapshot?.docs?.map(item=>item?.data())])
                // console.log('db f')
            })
         
        }
      
        // console.log(userTweets, followingTweets,'all')
       
    },[tweetsSnapshot, followingSnapshot])
    
    useEffect(()=>{
        if(userTweets?.length>0 && followingTweets?.length===0){
            // console.log('userif')
            setTweets(userTweets)
        }

        else if(userTweets?.length===0 && followingTweets?.length>0){
            // console.log('followingif')
            setTweets(followingTweets)
        }

        else if(userTweets?.length>0 && followingTweets?.length>0){

            // console.log('both')
            setTweets([...userTweets,...followingTweets].sort((a,b)=>b?.postedAt - a?.postedAt))
        }
        
        else setTweets([])

    },[userTweets, followingTweets])
 
    
  

    //  console.log(tweets,'tweets')
    
     
 

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
