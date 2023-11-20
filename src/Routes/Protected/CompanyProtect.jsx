import React from 'react'
import AdminRoutes from '../AdminRoutes';
import UserRoutes from '../UserRoutes';
import { Outlet } from 'react-router-dom';
import Login from '../../Pages/Login/Login';

function CompanyProtect() {
    const token = localStorage.getItem('token');
    localStorage.clear
    console.log(token,'ppppppprotection ');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded,'chehehehcked');
        if (decoded.is_superuser) {
            return <AdminRoutes />
        }
        else {  
            if (decoded.is_company) {
                return <Outlet />
            }
            else {
                return <UserRoutes />
            }
        }
    } else {
        return <Login />
    }
}

export default CompanyProtect