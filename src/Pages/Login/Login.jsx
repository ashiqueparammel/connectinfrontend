import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import googleImage from '../../Assets/googleAuth.png'
import logo from '../../Assets/Connectlogo.png';
import SignupImage from '../../Assets/SignupImage.png'
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';
import { ForgotPassword, Google_Access_Token, UserLoginUrl, User_Google_Login, VerifyEmail } from '../../Constants/Constants';
import { setUserDetails } from '../../Redux/Users';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';


function Login() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [forgotManage, setForgotManage] = useState(false)
    const [forgotEmail, setForgotEmail] = useState('')
    const [LoadingManage, setLoadingManage] = useState(false)
    const [manageVeryfy, setManageVeryfy] = useState(false)

    const HandleForgot = () => { setForgotManage(!forgotManage) }


    const verifyPasswordHandle = async (e) => {
        e.preventDefault();

        let user = {
            email: forgotEmail,
            otp: e.target.otp.value,
            password: e.target.password.value,
            confrimpassword: e.target.confrimpassword.value,
        };
        const validateForm = () => {
            if (user.otp.trim() === "") {
                toast.error('OTP should not be empty!');
                return false;
            }

            else if (user.otp.length < 6) {
                toast.error('OTP Should be 6 digits!');
                return false;
            }
            else if (user.password.trim() === "") {
                toast.error('Password should not be empty!');
                return false;
            }
            else if (user.confrimpassword.trim() === "") {
                toast.error('Confrim password should not be empty!');
                return false;
            }
            else if (user.password.length < 8) {
                toast.error('Password Should be need 8 length!');
                return false;
            }
            else if (user.password !== user.confrimpassword) {
                toast.error("Password didn't match!");

                return false;
            }
            return true;
        };

        if (validateForm()) {
            axios.post(VerifyEmail, user).then((response) => {
                if (response.data.status === 200) {
                    toast.success(response.data.Text)
                    navigate('/')
                    setForgotManage(false)
                    setManageVeryfy(false)


                }
                else if (response.data.status === 400) {
                    console.log(response);
                    toast.error(response.data.Text)
                }
            }).catch((error) => {
                toast.error(error);
            })

        }

    }

    const forgotHandle = () => {
        if (forgotEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(forgotEmail);
            if (isValidEmail) {
                setLoadingManage(true)
                const data = { email: forgotEmail }
                axios.post(ForgotPassword, data).then((response => {
                    if (response.data.status === 201) {
                        setLoadingManage(false)
                        setManageVeryfy(true)
                    }
                })).catch((error) => {
                    toast.error(error);
                })

            } else {
                toast.error('Please Enter Valid email!');

            }
        } else {
            toast.error('field cannot empty!');
        }

    }

    let message = new URLSearchParams(location.search)?.get('message') ?? null;

    const navigate = useNavigate();

    const Signup = () => {
        navigate('/choose')
    }
    let googleData = ''
    const LoginWithGoogleAuth = useGoogleLogin({
        onSuccess: (codeResponse) => {
            googleData = codeResponse
            console.log(googleData.access_token, 'googleDataTOken');
            GoogleAuth();
        },
        onError: (error) => {
            toast.error(error);
            console.log("Login Failed:", error);
        }
    });
    const GoogleAuth = async () => {
        try {
            if (!googleData) return;
            const tokenData = await axios.get(
                `${Google_Access_Token}access_token=${googleData.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${googleData.access_token}`,
                        Accept: "application/json",
                    },
                }
            );
            const backend_access = googleData.access_token
            googleData = tokenData.data;
            const googleUser = {
                email: googleData.email,
                access_token: backend_access
            }
            try {
                setLoadingManage(true)
                const googleResponse = await axios.post(User_Google_Login, googleUser);
                const response = googleResponse.data
                if (response.status === 406) {
                    setTimeout(() => {
                        toast.error(response.message)
                    }, 500);
                    navigate('/login')
                }
                if (response.status === 403) {
                    setTimeout(() => {
                        toast.error(response.message)
                    }, 500);
                    navigate('/login')
                }
                if (response.status === 202) {
                    setTimeout(() => {
                        toast.error(response.message)
                    }, 500);
                    navigate('/login')
                }
                // if already signup with form work this 

                if (response.status === 201) {
                    setTimeout(() => {
                        toast.success(response.message)
                    }, 500);
                    const data = (response.token)
                    localStorage.setItem('token', JSON.stringify(data));

                    try {
                        const token = jwtDecode(data.access)
                        const setUser = {
                            "id": token.user_id,
                            "email": token.email,
                            "is_superuser": token.is_superuser,
                            "is_company": token.is_company,
                            "is_google": token.is_google,
                            "is_active": token.is_active,
                        }
                        dispatch(setUserDetails(setUser));
                        setLoadingManage(false)
                        if (token.is_superuser && token.is_active) {
                            // toast.success('Login successfully!')
                            navigate('/admin/');
                        }
                        else if (token.is_company && token.is_active) {
                            navigate('/company/');
                            // toast.success('Login successfully!')
                        }
                        else if (token.is_active) {
                            // toast.success('Login successfully!')
                            navigate('/');
                        }
                        else {
                            toast.error('Invalid Credentials!')
                            navigate('/login');
                        }

                    } catch (error) {
                        console.error('Error decoding JWT:', error);
                    }

                }
            } catch (error) {
                console.error('Error during signup:', error);
                toast.error(error.message);
            }
        } catch (error) {
            console.log(error.response);
            toast.error(error.message);
        }
    };

    const loginUser = async (e) => {
        e.preventDefault();

        const user = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        console.log('User data:', user);
        const validateForm = () => {
            if (user.email.trim() === "") {
                toast.error('Email should not be empty!');
                return false;
            }
            else if (user.password.trim() === "") {
                toast.error('Password should not be empty!');
                return false;
            }
            return true;
        };
        if (validateForm()) {
            try {
                setLoadingManage(true)
                const responseData = await axios.post(UserLoginUrl, user);
                const response = responseData.data;
                localStorage.setItem('token', JSON.stringify(response));
                try {
                    const token = jwtDecode(response.access)
                    const setUser = {
                        "id": token.user_id,
                        "email": token.email,
                        "is_superuser": token.is_superuser,
                        "is_company": token.is_company,
                        "is_google": token.is_google,
                        "is_active": token.is_active,
                    }
                    dispatch(setUserDetails(setUser));
                    setLoadingManage(false)
                    if (token.is_superuser && token.is_active) {
                        toast.success('Login successfully!')
                        navigate('/admin/');
                    }
                    else if (token.is_company && token.is_active) {
                        toast.success('Login successfully!')
                        navigate('/company/');
                    }
                    else if (token.is_active) {
                        toast.success('Login successfully!')
                        navigate('/');
                    }
                    else {
                        toast.error('Invalid Credentials!')
                        navigate('/login');
                    }
                } catch (error) {
                    toast.error('Error decoding JWT:', error);
                }
            } catch (error) {
                toast.error('Error during signup:', error);
                const errorMessage = error.response.data.detail
                if (errorMessage) {
                    toast.error(errorMessage);
                } else {
                    toast.error(error.message);

                }
            }
        }
    }



    useEffect(() => {
        setTimeout(() => {
            if (message) {
                toast.success(message);
                message = null
            };
        }, 500);
    }, [message])



    return (

        <div className=''>

            <>
                {(LoadingManage ? <div className='absolute ml-[50%] mt-[20%] bg-opacity-50 items-center '><Loader /></div> : '')}
            </>
            <div className='flex'>
                <div>
                    <div>
                        <img
                            className='sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:ml-28 sm:mt-10 md:hidden lg:hidden w-44 ml-32'
                            src={logo}
                            alt="ConnectIn Logo"
                        />
                    </div>

                    {(forgotManage ? (manageVeryfy ?
                        <Card className="w-96  bg-[#051339]  lg:ml-10 ml-5 mt-5 lg:mt-28 rounded-sm" >

                            <Typography variant="h3" className='text-center font-roboto-mono text-3xl  mt-5' color="white">
                                Update Password
                            </Typography>
                            <form onSubmit={(e) => verifyPasswordHandle(e)}>

                                <CardBody className="flex flex-col font-prompt gap-5">
                                    <input type='number' name='otp' placeholder="Enter Your OTP " size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                    <input type='password' name='password' placeholder="Enter Your Password " size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                    <input type='password' name='confrimpassword' placeholder="Confirm Your password " size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                    <div className="-ml-2.5">
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button type='submit' variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal rounded-sm' fullWidth >
                                        continue
                                    </Button>
                                    <br />
                                    <h1 className='text-white  text-center mr-2 mt-2 font-prompt hover:cursor-pointer hover:text-[#cac9c9]' onClick={HandleForgot} >Back to Login?</h1>
                                </CardFooter>
                            </form>
                        </Card> :
                        <Card className="w-96  bg-[#051339]  lg:ml-10 ml-5 mt-5 lg:mt-28 rounded-sm" >
                            <Typography variant="h3" className='text-center font-roboto-mono text-3xl  mt-5' color="white">
                                Forgot Password
                            </Typography>
                            <CardBody className="flex flex-col font-prompt gap-5">
                                <input type='email' value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="Enter Your Email " size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                <div className="-ml-2.5">
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Button onClick={forgotHandle} variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal rounded-sm' fullWidth >
                                    continue
                                </Button>
                                <br />
                                <h1 className='text-white  text-center mr-2 mt-2 font-prompt hover:cursor-pointer hover:text-[#cac9c9]' onClick={HandleForgot} >Back to Login?</h1>


                            </CardFooter>
                        </Card>
                    ) :
                        <Card className="w-96  bg-[#051339]  lg:ml-10 ml-5 mt-5 lg:mt-28 rounded-sm" >
                            <Typography variant="h3" className='text-center font-roboto-mono text-3xl  mt-5' color="white">
                                LOGIN
                            </Typography>
                            <form onSubmit={(e) => loginUser(e)}>
                                <CardBody className="flex flex-col font-prompt gap-5">
                                    <input type='email' name='email' placeholder="Enter Your Email " size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                    <input type='password' name='password' placeholder="Enter Your Password" size="lg" className='bg-white h-12 rounded-sm' style={{ paddingLeft: '20px' }} />
                                    <div className="-ml-2.5">
                                    </div>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <Button type='submit' variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal rounded-sm' fullWidth >
                                        LOGIN
                                    </Button>
                                    <h1 className='text-white float-right mr-2 mt-2 font-prompt hover:cursor-pointer hover:text-[#cac9c9]' onClick={HandleForgot} >Forgot Password?</h1>
                                    <br />
                                    <p className='text-white  ml-24  text-center'>  or  </p>
                                    <br />
                                    <Button onClick={() => LoginWithGoogleAuth()} variant="filled" className=' flex bg-[#ffffff] gap-5 font-prompt font-prompt-normal rounded-sm text-black text-lg' fullWidth >
                                        <img src={googleImage} className='w-8  h-8 ml-2' alt="" />
                                        SIGN IN WITH GOOGLE
                                    </Button>

                                    <Button onClick={Signup} variant="filled" className='bg-[#0A3863] font-prompt text-sm font-prompt-xlight mt-5 rounded-sm' fullWidth >
                                        New connection?Join Now
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>)}
                </div>
                <div className='flex flex-col justify-center'>
                    <div>
                        <img className='w-0 ml-0 lg:w-72 lg:ml-96 lg:mt-10' src={logo} alt="ConnectIn Logo " />
                    </div>

                    <div className="lg:flex flex-col  lg:justify-center lg:gap-3 lg:ml-18 ">
                        <h1 className=" text-white  lg:font-prompt lg:text-5xl  lg:text-zinc-400 lg:ml-40  ">
                            Welcome to your professional community
                        </h1>
                        <div className=' w-0 h-0 lg:mr-6 lg:w-[500px]  lg:h-[450px] lg:ml-48'>
                            <img src={SignupImage} alt="Connect in Logo" className='w-full h-full object-cover' />
                        </div>
                    </div>


                </div>
                <Toaster />
            </div>
        </div>
    )
}

export default Login
