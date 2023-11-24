import React from 'react'
import CompanyRoutes from '../CompanyRoutes';
import UserRoutes from '../UserRoutes';
import { Outlet } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import { jwtDecode } from 'jwt-decode';


function AdminProtected() {
    console.log('hhhhhhhhhhhhhhhhhhhhha');
    const token = localStorage.getItem('token');

    console.log(token, 'admin cheeekkkkkkkkk ');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded, 'chehehehckedadmin');
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