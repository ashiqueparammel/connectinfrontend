import React from 'react';
import { jwtDecode } from 'jwt-decode';
import CompanyRoutes from '../CompanyRoutes';
import UserRoutes from '../UserRoutes';
import Login from '../../Pages/Login/Login';
import AdminRout from '../AdminRout';

function ProtectedRoutes() {
    const token = localStorage.getItem('token');


    if (token) {

        const decoded = jwtDecode(token);
        if (decoded.is_superuser) {
            return <AdminRout />
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

export default ProtectedRoutes