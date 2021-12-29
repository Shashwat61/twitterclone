import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Users from './Users';

function FollowSidebar() {
    const [user]=useAuthState(auth)
    const [followingSnapshot]=useCollectionData(db.collection('users').doc(user?.uid).collection('following'))
    
    
    const [usersSnapshot]=useCollection(db.collection('users').where("email", "!=", user?.email))
    
    
    
    
    function makeHandle(name){
        return name?.split(' ').join('').toLowerCase()
    }
    
    return (
        <div className="sticky top-0 hidden h-screen px-4 pt-1 space-y-10 lg:block lg:col-span-2">
            <div className="flex items-center p-2 bg-gray-100 rounded-md">
                <SearchIcon className="text-gray-500"/>
                <input type="text" placeholder="Search" className="w-full pl-1 bg-transparent border-none focus:outline-none" />
            </div>
            <div className='p-2 bg-gray-100 rounded-md'>
                <h3 className="text-lg font-semibold">Who to Follow</h3>
                {usersSnapshot?.docs.length>0 && (
                    usersSnapshot?.docs?.map((doc)=>(
                     <Users key={doc?.data().email} email={doc?.data().email} name={doc?.data().name} handle={makeHandle(doc?.data().name)} img={doc?.data().photoURL} />   
                    )))}

            </div>
        </div>
    )
}

export default FollowSidebar
