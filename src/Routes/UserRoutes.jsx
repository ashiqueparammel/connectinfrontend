import React from 'react'
import Home from '../Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UserProtected from './Protected/UserProtected'
import UserLayout from '../Pages/User/UserLayout/UserLayout'
import UserHome from '../Pages/Home/UserHome'
import UserMyItems from '../Pages/User/MyItems/UserMyItems'
import Jobs from '../Pages/User/Jobs/Jobs'
import JobView from '../Pages/User/JobView/JobView'
import UserProfile from '../Pages/User/Profile/Profile'
import Applied from '../Pages/User/Applied/Applied'
import AppliedView from '../Pages/User/AppliedView/AppliedView'
import Chat from '../Pages/Chat/Chat'
import ProfileView from '../Pages/Profileview/ProfileView'
import VideoCall from '../Pages/VideoCall/VideoCall'
import Notifications from '../Pages/Notifications/Notifications'



function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route element={<UserProtected />}>
                    <Route element={<UserLayout />}>
                        <Route element={<UserHome />} path='/' />
                        <Route element={<UserMyItems />} path='/myitems' />
                        <Route element={<Jobs />} path='/jobs' />
                        <Route element={<JobView />} path='/jobview' />
                        <Route element={< UserProfile />} path='/profile' />
                        <Route element={< Applied />} path='/applyjob' />
                        <Route element={< AppliedView />} path='/applyjobview' />
                        <Route element={<Chat />} path='/chat' />
                        <Route element={<VideoCall />} path='/videocall' />
                        <Route element={<ProfileView />} path='/profileview' />
                        <Route element={<Notifications />} path='/notifications' />



                    </Route>
                </Route>
            </Routes>
        </div>

    )
}

export default UserRoutes

