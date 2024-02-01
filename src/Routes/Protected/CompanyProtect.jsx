import React from 'react'
import UserRoutes from '../UserRoutes';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../../Pages/Login/Login';
import AdminRout from '../AdminRout';
import { jwtDecode } from 'jwt-decode';
import { Authentication, RefreshTokenAuto, TokenRefresh } from '../../Constants/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { resetState } from '../../Redux/Users';
import { CompanyResetState } from '../../Redux/Companyees';


function CompanyProtect() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const AuthCheck = JSON.parse(localStorage.getItem('token'));

    const { access } = AuthCheck
    if (token) {
        const AuthCheck = JSON.parse(localStorage.getItem('token'));
        const createNewToken = () => {
            const AuthCheckk = JSON.parse(localStorage.getItem('token'));
            if (AuthCheck.access) {
                const { access } = AuthCheckk
                const config = { headers: { Authorization: ` Bearer ${access}` } };
                axios.get(RefreshTokenAuto, config)
                    .then((response) => {
                        localStorage.setItem('token', JSON.stringify(response.data.token))
                    })
                    .catch((error) => {
                        console.error('Error making request:', error.data);
                    });
            } else {
                localStorage.removeItem('token')
                dispatch(resetState);
                navigate('/login');
                console.log("Error: ", error)
            }
        }

        const refreshToken = () => {
            if (AuthCheck.refresh) {
                const { refresh } = AuthCheck
                const refreshtoken = {
                    refresh: refresh
                }
                try {
                    axios.post(TokenRefresh, refreshtoken).then((response) => {
                        localStorage.setItem('token', JSON.stringify(response.data))
                        createNewToken()
                    })
                } catch (error) {
                    localStorage.removeItem('token')
                    dispatch(resetState);
                    navigate('/login');
                    console.log("Error: ", error)
                }
            } else {
                localStorage.removeItem('token')
                dispatch(resetState);
                navigate('/login');
                console.log("Error: ", error)
            }

        }

        const decoded = jwtDecode(token);
        const config = { headers: { Authorization: ` Bearer ${access}` } };
        const userAuthentication = async () => {
            try {
                const Authenticated = await axios.get(Authentication, config)
                const response = await Authenticated.data
            } catch (error) {
                console.log('access token not valid!');
                refreshToken()
            }
        }
        userAuthentication()

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