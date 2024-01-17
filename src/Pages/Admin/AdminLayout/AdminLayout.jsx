import React from 'react'
import AdminNavbar from '../../../Components/Navbar/AdminNavbar'
import Sidebar from '../../../Components/Sidebar/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'

function AdminLayout() {

    const navigate = useNavigate();

    const setHead = (route) => {
        switch (route) {
            case '/':
                return 'DASHBOARD';
            case '/admin/user':
                return 'USER';
            case '/admin/company':
                return 'COMPANY';
            case '/admin/jobreports':
                return 'JOB REPORTS';
            case '/admin/postreports':
                return 'POST REPORTS';
            // case '/admin/skills':
            //     return 'SKILLS';
            default:
                return '';
        }
    };


    const currentRoute = window.location.pathname;


    const head = setHead(currentRoute);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex flex-col w-full'>
                <AdminNavbar head={head} />
                <Outlet />
            </div>

        </div>
    )
}

export default AdminLayout