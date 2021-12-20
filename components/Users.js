import { useAuthState } from "react-firebase-hooks/auth"
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from "../firebase"

function Users({email, name, img, handle}) {
    const [user]=useAuthState(auth)
    const [followingSnapshot]=useCollection(db.collection('users').doc(user?.uid).collection('following').where("email", "==", email))
    
    function handleClick(){
        if(!followingSnapshot?.docs?.map(item=>item.data().email).includes(email)){ 

            db.collection('users').doc(user?.uid).collection('following').add({email}).then(()=>console.log('followed',name)).catch(err=>console.log(err))   //adds the user to the following collection
        } 
    }
    
    return (
        <div className="flex my-4">
            <img src={img} alt={name} className="w-10 h-10 rounded-full sm:h-12 sm:w-12"/>
            <div className="flex items-center justify-between w-full pl-4 ">
                <div className="text-sm sm:text-base">
                <p className="font-semibold">{name}</p>
                <p>@{handle}</p>
                </div>
                <button onClick={handleClick} className="px-2 py-1 font-semibold bg-gray-400 rounded-md text-gray-50">{followingSnapshot?.docs?.map(user=>user?.data().email)==email ? 'Following' : 'Follow'}</button>

            </div>
        </div>
    )
}

export default Users
