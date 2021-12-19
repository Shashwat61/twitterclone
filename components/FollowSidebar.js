import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import Users from './Users';
const users=[
    {
        id:1,
        name:'John Doe',
        handle:'@johndoe',
        imgURL:'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
    },
    {
        id:2,
        name:'Johny Doe',
        handle:'@johnydoe',
        imgURL:'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
    }
]
function FollowSidebar() {
    const [user]=useAuthState(auth)
    const [usersSnapshot]=useCollection(db.collection('users').where("email", "!=", user?.email))
    console.log(usersSnapshot?.docs?.map(doc=>doc.data()))
    return (
        <div className="sticky top-0 hidden h-screen px-4 pt-1 space-y-10 lg:block lg:col-span-2">
            <div className="flex items-center p-2 bg-gray-100 rounded-md">
                <SearchIcon className="text-gray-500"/>
                <input type="text" placeholder="Search" className="w-full pl-1 bg-transparent border-none focus:outline-none" />
            </div>
            <div className='p-2 bg-gray-100 rounded-md'>
                <h3 className="text-lg font-semibold">Who to Follow</h3>
                {usersSnapshot?.docs.length>0 && (
                    usersSnapshot?.docs.map((doc)=>(
                     <Users key={doc?.data().id} name={doc?.data().displayName} handle={handle} img={doc?.data().photoURLURL} />   
                    )))}

            </div>
        </div>
    )
}

export default FollowSidebar
