import React from 'react'
import UserRoutes from '../UserRoutes';
import { Outlet } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import AdminRout from '../AdminRout';
import { jwtDecode } from 'jwt-decode';

function CompanyProtect() {
    const token = localStorage.getItem('token');
  
    console.log(token,'ppppppprotection company');

    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded,'chehehehckedcompany');
        if (decoded.is_superuser) {
            return <AdminRout />
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