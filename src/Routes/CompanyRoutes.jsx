import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyProtect from './Protected/CompanyProtect'
import CompanySignup from '../Pages/Company/CompanySignup/CompanySignup'
import CompanyLayout from '../Pages/Company/CompanyLayout/CompanyLayout'
import CompanyHome from '../Pages/Home/CompanyHome'
import CompanyMyItems from '../Pages/Company/MyItems/CompanyMyItems'
import PostView from '../Pages/Company/PostView/PostView'
import AddPost from '../Components/CompanyComponents/AddPost/AddPost.Jsx'
import ProfileCompany from '../Pages/Company/Profile/Profile'
import ApplicationViews from '../Pages/Company/ApplicationViews/ApplicationViews'
import ApplicationProfile from '../Pages/Company/ApplicationProfileView/ApplicationProfile'
import Chat from '../Pages/Chat/Chat'
import ProfileView from '../Pages/Profileview/ProfileView'
import VideoCall from '../Pages/VideoCall/VideoCall'
import ErrorPage from '../Pages/ErrorPage/ErrorPage'
import Notifications from '../Pages/Notifications/Notifications'
import FollowingFollowings from '../Pages/FollowingFollowers/FollowingFollowings'
import Connections from '../Pages/Connections/Connections'
import JobSearchCompany from '../Pages/Company/JobSearch/JobSearch'


function CompanyRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<CompanyProtect />}>
          <Route element={<CompanyLayout />}>
            <Route element={<CompanyHome />} path='/' />
            <Route element={<CompanySignup />} path='/profileverify' />
            <Route element={<ProfileCompany />} path='/profile' />
            <Route element={<CompanyMyItems />} path='/myitems' />
            <Route element={<PostView />} path='/postview' />
            <Route element={<AddPost />} path='/addpost' />
            <Route element={<ApplicationViews />} path='/applicationviews' />
            <Route element={<ApplicationProfile />} path='/applicationprofile' />
            <Route element={<Chat />} path='/chat' />
            <Route element={<VideoCall />} path='/videocall' />
            <Route element={<ProfileView />} path='/profileview' />
            <Route element={<Notifications />} path='/notifications' />
            <Route element={<FollowingFollowings />} path='/followings' />
            <Route element={<Connections />} path='/connections' />
            <Route element={<JobSearchCompany />} path='/jobsearch' />

           

          </Route>
        </Route>
        <Route element={<ErrorPage />} path='/*' />

      </Routes>
    </div>
  )
}

export default CompanyRoutes