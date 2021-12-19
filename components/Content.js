import Tweets from './Tweets';
import UserTweet from './UserTweet';

function Content() {
    return (
        <div className="col-span-5 border sm:col-span-4 lg:col-span-3">
            <UserTweet/>
            <Tweets/>

        </div>
    )
}

export default Content
