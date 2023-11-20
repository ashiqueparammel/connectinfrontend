import React from 'react'
import { Outlet } from 'react-router-dom';
import CompanyRoutes from '../CompanyRoutes';
import AdminRoutes from '../AdminRoutes';
import Login from '../../Pages/Login/Login';
import { jwtDecode } from 'jwt-decode';

function UserProtected() {
    const token = localStorage.getItem('token');
    localStorage.clear
    console.log(token, 'ppppppprotection ');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded, 'chehehehcked');
        if (decoded.is_superuser) {
            return <AdminRoutes />
        }
        else if (decoded.is_company) {
            return <CompanyRoutes />
        }
        else {
            return <Outlet />
        }

    } else {
        return <Login />
    }
}

export default UserProtected