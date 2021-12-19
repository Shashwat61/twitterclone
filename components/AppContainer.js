import Content from "./Content"
import FollowSidebar from "./FollowSidebar"
import Sidebar from "./Sidebar"

function AppContainer() {
    return (
        <div className="relative grid mx-auto max-w-7xl sm:grid-cols-5 lg:grid-cols-6" >
            {/* xs tweets sm sidebar tweets lg sidebar tweets follow sidebar */}

            {/* sidebar */}
            <div className="col-span-1">
            <Sidebar/>
            </div>


            {/* content */}
            <Content/>

            {/* follow sidebar */}
            <div className="col-span-2">
            <FollowSidebar/>
            </div>


        </div>
    )
}

export default AppContainer
