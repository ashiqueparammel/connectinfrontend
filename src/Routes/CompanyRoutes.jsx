import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyProtect from './Protected/CompanyProtect'
import CompanySignup from '../Pages/Company/CompanySignup/CompanySignup'
import CompanyLayout from '../Pages/Company/CompanyLayout/CompanyLayout'
import CompanyHome from '../Pages/Home/CompanyHome'
import CompanyMyItems from '../Pages/Company/MyItems/CompanyMyItems'
import PostView from '../Pages/Company/PostView/PostView'

function CompanyRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<CompanyProtect />}>
        <Route element={<CompanyLayout />}>
          <Route element={<CompanyHome />} path='/' />
          <Route element={<CompanySignup />} path='/profileverify' />
          <Route element={<CompanyMyItems />} path='/myitems' />
          <Route element={<PostView/>} path='/postview' />
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default CompanyRoutes