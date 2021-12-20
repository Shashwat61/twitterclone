import {useState} from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import {db, auth} from '../firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import firebase from 'firebase'

function UserTweet() {
    const [tweet, setTweet]=useState('')
    const [count, setCount]=useState(140)
    const [user]=useAuthState(auth)
    
    function makeHandle(user){
        return user?.displayName.split(' ').join('').toLowerCase()
    }
    
    function handleSubmit(e){
        e.preventDefault()

        if(count>=0 && tweet.length>0){
           db.collection('tweets').add({
               name: user?.displayName,
               email:user?.email,
               img:user?.photoURL,  
               tweet,
               postedAt:firebase.firestore.FieldValue.serverTimestamp(),
               handle:`@${makeHandle(user)}`
           }).then(docRef=>console.log('Document written with ID: ', docRef.id)).catch(err=>console.log(err))
           setTweet('')
           setCount(140)
        }else{
               console.log('error')          
        }
    }

    function handleChange(e){
        setTweet(e.target.value)
        setCount(140 - e.target.value.length)
    }
    return (
        <div className="px-4 pt-1 border">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold sm:text-lg">Home</h3>
                <AutoAwesomeIcon/>
            </div>
            <div className="flex pt-4">
            <AccountCircleIcon fontSize="large"/>
            <form className="w-full ml-2" onSubmit={handleSubmit}>
            <input value={tweet} onChange={handleChange} type="text" placeholder="What is happening" className="w-10/12 py-1 focus:outline-none focus:border-none focus:ring-0"/>
            {count<11 && <span className={ count<0 ? "ml-2 border-2 rounded-full border-red-400":"ml-2 rounded-full px-1 border-2 border-yellow-400" }>{count}</span>}
            <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-5">
                <PhotoSizeSelectActualIcon fontSize="small" className="text-blue-500"/>
                <GifBoxIcon fontSize="small" className="text-blue-500"/>
                <SentimentSatisfiedAltIcon fontSize="small" className="text-blue-500"/>
                <DateRangeIcon fontSize="small" className="text-blue-500"/>
                <LocationOnIcon fontSize="small" className="text-blue-500"/>
                
            </div>
            <button className="px-2 py-1 text-white bg-blue-500 rounded-md" type="submit">Tweet</button>
            </div>
            </form>

            </div>

        </div>
    )
}

export default UserTweet
