import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CompanyProtect from './Protected/CompanyProtect'
import Home from '../Pages/Home/Home'

function CompanyRoutes() {
  return (
    <div>
      <Routes>
        <Route element={<CompanyProtect />}>
          <Route element={<Home />} path='/' />
        </Route>
      </Routes>
    </div>
  )
}

export default CompanyRoutes