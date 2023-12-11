import React from 'react'
import UserRoutes from '../UserRoutes';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import AdminRout from '../AdminRout';
import { jwtDecode } from 'jwt-decode';
import { Authentication } from '../../Constants/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetState } from '../../Redux/Users';
import { CompanyResetState } from '../../Redux/Companyees';


function CompanyProtect() {
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
                dispatch(CompanyResetState);
                navigate('/login');
                console.log("Error: ", error)
            }
        }
        userAuthentication()

        console.log(decoded, 'chehehehckedcompany');
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