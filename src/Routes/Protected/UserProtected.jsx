import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import CompanyRoutes from '../CompanyRoutes';
import Login from '../../Pages/Login/Login';
import { jwtDecode } from 'jwt-decode';
import AdminRout from '../AdminRout';
import { Authentication, RefreshTokenAuto, TokenRefresh } from '../../Constants/Constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { resetState } from '../../Redux/Users';

function UserProtected() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token === null) {
            navigate('/login')
        }
    }, [])


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
                    }).catch((error) => {
                        localStorage.removeItem('token')
                        dispatch(resetState);
                        navigate('/login');
                        console.log("Error: ", error)
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
        const { access } = AuthCheck
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