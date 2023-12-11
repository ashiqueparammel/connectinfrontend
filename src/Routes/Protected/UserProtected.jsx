import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import CompanyRoutes from '../CompanyRoutes';
import Login from '../../Pages/Login/Login';
import { jwtDecode } from 'jwt-decode';
import AdminRout from '../AdminRout';
import { Authentication } from '../../Constants/Constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { resetState } from '../../Redux/Users';

function UserProtected() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const AuthCheck = JSON.parse(localStorage.getItem('token'));

    console.log(AuthCheck, 'converting that token');
    const { access } = AuthCheck
    console.log('validate Access Token ', access);
    if (token) {
        const decoded = jwtDecode(token);
        const config = { headers: { Authorization: ` Bearer ${access}` } };
        const userAuthentication = async () => {
            try {
                const Authenticated = await axios.get(Authentication, config)
                const response = await Authenticated.data
                console.log(response, 'Authentication response data ')
            } catch (error) {
                localStorage.removeItem('token')
                dispatch(resetState);
                navigate('/login');
                console.log("Error: ", error)
            }
        }
        userAuthentication()
        if (decoded.is_superuser) {
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