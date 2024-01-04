import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminProtected from './Protected/AdminProtected'
import DashBoard from '../Pages/Admin/DashBoard'
import AdminLayout from '../Pages/Admin/AdminLayout/AdminLayout'
import UserManagement from '../Pages/Admin/UserManagement'
import CompanyManagement from '../Pages/Admin/CompanyManagement'
import SkillsManagement from '../Pages/Admin/SkillsManagement'
import JobReports from '../Pages/Admin/JobReports'

function AdminRout() {
    return (
        <div>
            <Routes>
                <Route element={<AdminProtected />}>
                    <Route element={<AdminLayout />}>
                        <Route element={<DashBoard />} path='/' />
                        <Route element={<UserManagement  />} path='/user' />
                        <Route element={<CompanyManagement  />} path='/company' />
                        <Route element={<SkillsManagement  />} path='/skills' />
                        <Route element={<JobReports  />} path='/jobreports' />
                    </Route>
                </Route>
            </Routes>

        </div>
    )
}

export default AdminRout
