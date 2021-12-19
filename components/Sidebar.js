import TwitterIcon from '@mui/icons-material/Twitter';
import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArticleIcon from '@mui/icons-material/Article';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {auth} from '../firebase'

function Sidebar() {
    return (
        <div className="hidden pt-1 top-0 sticky sm:block" >
            <div className="flex flex-col items-center  space-y-8">
                <TwitterIcon className=" cursor-pointer text-blue-500" fontSize="large"  />
                <NotificationsNoneIcon fontSize="large"  className="cursor-pointer  hover:bg-gray-300  rounded-full" />
                <HomeIcon fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full" />
                <TagIcon  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>
                <MailOutlineIcon  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>
                <BookmarkBorderIcon  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>
                <ArticleIcon  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>
                <PersonOutlineIcon  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>
                <AccountCircleIcon onClick={()=>auth.signOut()}  fontSize="large" className="cursor-pointer  hover:bg-gray-300  rounded-full"/>

            </div>
        </div>
    )
}

export default Sidebar
