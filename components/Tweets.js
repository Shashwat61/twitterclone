import { useState } from "react"
import Tweet from "./Tweet"
import { useAuthState } from "react-firebase-hooks/auth"
import {useCollection} from 'react-firebase-hooks/firestore'
import { auth, db } from "../firebase"


function Tweets() {
    const [user]=useAuthState(auth)
    const [tweetsSnapshot]=useCollection(db.collection('users').doc(user?.uid).collection('tweets').orderBy('postedAt', 'desc'))

    return (
        <div className="w-full ">
            {tweetsSnapshot?.docs?.length>0 ? (
                tweetsSnapshot?.docs?.map((doc)=>(
                    <Tweet key={doc?.data().id} name={user?.displayName}  postedAt={doc?.data()?.postedAt} img={user?.photoURL} tweet={doc?.data()?.tweet} handle={doc?.data()?.handle} />

            ))):(
                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold">No Tweets</h3>
                    </div>
            )}
        </div>
    )
}

export default Tweets
