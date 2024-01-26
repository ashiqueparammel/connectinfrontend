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
          <Route element={<PostView/>} path='/postview' />
          <Route element={<AddPost/>} path='/addpost' />
          <Route element={<ApplicationViews/>} path='/applicationviews' />
          <Route element={<ApplicationProfile/>} path='/applicationprofile' />
          <Route element={<Chat/>} path='/chat' />
          <Route element={<VideoCall />} path='/videocall' />
          <Route element={<ProfileView />} path='/profileview' />

        </Route>
        </Route>
        <Route element={<ErrorPage />} path='/*' />

      </Routes>
    </div>
  )
}

export default CompanyRoutes