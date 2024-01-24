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
            console.log("work done");
            navigate('/login')
        }
    }, [])


    if (token) {
        const AuthCheck = JSON.parse(localStorage.getItem('token'));
        const createNewToken = () => {
            const AuthCheckk = JSON.parse(localStorage.getItem('token'));
            if (AuthCheck.access) {
                const { access } = AuthCheckk
                console.log('validate Access Token createNewToken  ', access);
                const config = { headers: { Authorization: ` Bearer ${access}` } };
                axios.get(RefreshTokenAuto, config)
                    .then((response) => {
                        // console.log('Response from server:', response.data);
                        localStorage.setItem('token', JSON.stringify(response.data.token))
                        // console.log(localStorage.getItem('token'), 'local storage');
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
                        // console.log(response.data, 'refrshh token');
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
        console.log(AuthCheck, 'converting that token');
        const { access } = AuthCheck
        console.log('validate Access Token ', access);
        const decoded = jwtDecode(token);
        console.log('decode', decoded.user_id);
        const config = { headers: { Authorization: ` Bearer ${access}` } };
        const userAuthentication = async () => {
            try {

                const Authenticated = await axios.get(Authentication, config)
                const response = await Authenticated.data
                console.log(response, 'Authentication response data ')
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