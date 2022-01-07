import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import TimeAgo from 'react-timeago'
import { useEffect, useState } from 'react';
import { auth, db } from "../firebase"
import {useCollection} from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth';

// click on like button -> like collection is made in that tweet collection -> contains the email of the user who liked the tweet -> and when the user same clicks on the liked button then that particular user will be removed from the user 
// keep a check if the liked collection contains the user email -> if it does then show the red liked button else show the like button  
function Tweet({email, name, handle, img, tweet, postedAt}) {
    const[user]=useAuthState(auth)
    const [checkLiked, setCheckLiked] = useState(false)
    const[id,setId]=useState(null)
    const [tweetsnapshot]=useCollection(db.collection('tweets').where('tweet','==',tweet))
    const secs=Math.floor(Math.abs(new Date() - postedAt?.toDate())/1000)
    const mins=Math.floor(secs/60)
     
    useEffect(()=>{
        setId(tweetsnapshot?.docs?.map(doc=>doc?.id)?.[0])
    },[tweetsnapshot])

    useEffect(()=>{
        id!==null && db.collection('tweets')?.doc(id).collection('likes').onSnapshot((querySnapshot)=>{
            // console.log(querySnapshot.docs?.map(doc=>doc?.data().email).includes(user?.email))
            if(querySnapshot?.docs?.map(doc=>doc?.data()?.email).includes(user?.email)){
                setCheckLiked(true)
            }
        })
    },[checkLiked,id])
    
    function handleLike(){
       db.collection('tweets').doc(id).collection('likes').doc(user?.uid).set({
              email: user?.email
       },false).then(()=>console.log('resovled')).catch(err=>console.log(err))
         setCheckLiked(true)
   }

   function handleUnlike(){
       db.collection('tweets').doc(id).collection('likes').doc(user?.uid).delete().then(()=>console.log('removed')).catch(err=>console.log(err))
    setCheckLiked(false)
   }
    
   
    return (
        <div className="px-4 py-4 border-b">
            <div className="flex ">
          <img src={img} alt={name} className="w-10 h-10 rounded-full sm:h-12 sm:w-12"/>
          <div className="w-full pl-2">
              <div className="flex items-center justify-between text-sm sm:text-base ">
                  <div className="flex items-center space-x-5">
                  <span className="font-semibold">{name}</span>
                    <span className="">{handle}</span>
                    <div className="flex items-center">
                        <span className="pb-2 pr-1 font-semibold">.</span>
                        {postedAt!==null && (
                            mins<1 ? 'just now':
                        <TimeAgo date={postedAt?.toDate()}/>
                        )}
                        </div>
                  </div>
                  <MoreHorizIcon className="cursor-pointer" />
              </div>
                <p className="text-sm sm:text-base">{tweet}</p> 
                <div className="flex items-center justify-between pt-2">
                    <ChatBubbleOutlineIcon className="cursor-pointer" fontSize="small"/>
                    {checkLiked ? 
                        <FavoriteIcon color="error"  onClick={handleUnlike} className="cursor-pointer" fontSize="small"/>
                        :
                        <FavoriteBorderIcon onClick={handleLike} className="cursor-pointer" fontSize="small"/>
                    }
                    <IosShareIcon className="cursor-pointer" fontSize="small"/>
                </div>
          </div>  
            </div>
        </div>
    )
}

export default Tweet
