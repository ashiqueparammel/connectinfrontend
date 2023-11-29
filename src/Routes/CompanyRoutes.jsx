import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyProtect from './Protected/CompanyProtect'
import CompanySignup from '../Pages/Company/CompanySignup/CompanySignup'
import CompanyLayout from '../Pages/Company/CompanyLayout/CompanyLayout'
import CompanyHome from '../Pages/Home/CompanyHome'

function CompanyRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<CompanyProtect />}>
        <Route element={<CompanyLayout />}>
          <Route element={<CompanyHome />} path='/' />
          <Route element={<CompanySignup />} path='/profileverify' />
        </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default CompanyRoutes