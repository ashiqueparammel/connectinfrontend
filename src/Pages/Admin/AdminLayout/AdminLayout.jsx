import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Sidebar/SideBar'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <AdminNavbar />
                <Outlet />
            </div>

        </div>
    )
}

export default AdminLayout