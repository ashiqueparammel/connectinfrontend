import React from 'react'
import CompanyRoutes from '../CompanyRoutes';
import UserRoutes from '../UserRoutes';
import { Outlet } from 'react-router-dom';
import Login from '../../Pages/Login/Login';


function AdminProtected() {
    const token = localStorage.getItem('token');
    localStorage.clear
    console.log(token,'ppppppprotection ');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded,'chehehehcked');
        if (decoded.is_superuser) {
            return <Outlet />
        }
        else {  
            if (decoded.is_company) {
                return <CompanyRoutes />
            }
            else {
                return <UserRoutes />
            }
        }
    } else {
        return <Login />
    }
}

export default AdminProtected