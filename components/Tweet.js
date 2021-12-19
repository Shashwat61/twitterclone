import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IosShareIcon from '@mui/icons-material/IosShare';
import TimeAgo from 'react-timeago'

function Tweet({id, name, handle, img, tweet, postedAt}) {
    
    const secs=Math.floor(Math.abs(new Date() - postedAt?.toDate())/1000)
    const mins=Math.floor(secs/60)
   
    
   
    return (
        <div className="px-4 py-4 border">
            <div className="flex ">
          <img src={img} alt={name} className="w-10 h-10 rounded-full sm:h-12 sm:w-12"/>
          <div className="w-full pl-2">
              <div className="flex items-center justify-between text-sm sm:text-base ">
                  <div className="flex items-center space-x-5">
                  <span className="font-semibold">{name}</span>
                    <span className="">{handle}</span>
                    <div className="flex items-center">
                        <span className="pb-2 pr-1 font-semibold">.</span>
                        {mins <1 ? 'just now' :<TimeAgo date={postedAt?.toDate()}/>}
                        </div>
                  </div>
                  <MoreHorizIcon className="cursor-pointer" />
              </div>
                <p className="text-sm sm:text-base">{tweet}</p> 
                <div className="flex items-center justify-between pt-2">
                    <ChatBubbleOutlineIcon className="cursor-pointer" fontSize="small"/>
                    <FavoriteBorderIcon className="cursor-pointer" fontSize="small"/>
                    <IosShareIcon className="cursor-pointer" fontSize="small"/>
                </div>
          </div>  
            </div>
        </div>
    )
}

export default Tweet
