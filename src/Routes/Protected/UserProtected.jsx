import React from 'react'
import { Outlet } from 'react-router-dom';
import CompanyRoutes from '../CompanyRoutes';
import Login from '../../Pages/Login/Login';
import { jwtDecode } from 'jwt-decode';
import AdminRout from '../AdminRout';

function UserProtected() {
    const token = localStorage.getItem('token');
    
    console.log(token, 'ppppppprotectionuser ');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded, 'chehehehckeduser');
        if (decoded.is_superuser) {
            console.log('monnnnnnnnnnnnnnnnnnnna');
            return <AdminRout />
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