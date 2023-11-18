import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import googleImage from '../../Assets/googleAuth.png'
import logo from '../../Assets/Connectlogo.png';
import SignupImage from '../../Assets/SignupImage.png'
import { UserSignUpUrl } from '../../Constants/Constants';
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios';


function Signup() {

    const location = useLocation()
    const navigate = useNavigate()
    const checkData = location.state || ''
    const [company_data, setCompany_data] = useState('')

    useEffect(() => {
        if (checkData) {
            if (checkData.data) {
                setCompany_data(true)
            }
            else {
                setCompany_data(false)
            }
        } else {
            navigate('/choose')
        }
    }, [])

    const toLogin = () => {
        navigate('/login')
    }
    const signupform = async (e) => {
        e.preventDefault();

        const user = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
            phone_number: '+91' + e.target.phone_number.value,
            is_company: company_data,
            is_google: false,
        };
        console.log('User data:', user);
        const validateForm = () => {
            if (user.username.trim() === "") {
                toast.error('Username should not be empty!');
                return false;
            }
            else if (user.email.trim() === "") {
                toast.error('Email should not be empty!');
                return false;
            }
            else if (user.phone_number.trim() === "") {
                toast.error('Phonenumber should not be empty!');
                return false;
            }
            else if (user.phone_number.length < 10) {
                toast.error('Phonenumber Should be 10 digits!');
                return false;
            }
            else if (user.password.trim() === "") {
                toast.error('Password should not be empty!');
                return false;
            }
            else if (user.password2.trim() === "") {
                toast.error('Confrim password should not be empty!');
                return false;
            }
            else if (user.password.length < 8) {
                toast.error('Password should not be empty!');
                return false;
            }
            else if (user.password !== user.password2) {
                toast.error("Password didn't match!");

                return false;
            }
            return true;
        };
        if (validateForm()) {
            try {
                const responseData = await axios.post(UserSignUpUrl, user);
                const response = responseData.data
                if (response.status === 200) {
                    toast.success('Sign Up successfully!')
                    navigate('/verification', { state: { data: user.email } })
                }

                else if (response.status === 404) {

                    if (response.Text.username) {
                        toast.error(response.Text.username[0])
                    }
                    else if (response.Text.email) {
                        toast.error(response.Text.email[0])
                    }
                    else if (response.Text.phone_number) {
                        toast.error(response.Text.phone_number[0])
                    }
                }

            } catch (error) {
                console.error('Error during signup:', error);
                toast.error(error);
            }

        }


    }







    return (
        <div className='flex '>
            <div>
                <div>
                    <img
                        className='sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:ml-28 sm:mt-10 md:hidden lg:hidden w-44 ml-32'
                        src={logo}
                        alt="ConnectIn Logo"
                    />
                </div>



                <Card className="w-96  bg-[#051339] lg:mt-8 lg:ml-10 ml-5 mt-5" >
                    <Typography variant="h3" className='text-center font-roboto-mono text-3xl  mt-5' color="white">
                        SIGN UP
                    </Typography>
                    <form onSubmit={(e) => signupform(e)}>
                        <CardBody className="flex flex-col font-prompt gap-5">
                            <Input type='text' name='username' label="Enter Your username" size="lg" className='bg-white' />
                            <Input type='email' name='email' label="Enter Your Email" size="lg" className='bg-white' />
                            <Input type='phonenumber' name='phone_number' label="Enter Your Phonenumber" size="lg" className='bg-white' />
                            <Input type='password' name='password' label="Enter Your Password" size="lg" className='bg-white' />
                            <Input type='password' name='password2' label="Confirm Your Password" size="lg" className='bg-white' />
                            <div className="-ml-2.5">

                            </div>
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type='submit' variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal' fullWidth >
                                SIGN UP
                            </Button>
                            <br />
                            <p className='text-white ml-2 text-center'> or  </p>
                            <br />
                            <Button variant="filled" className=' flex bg-[#ffffff] gap-5 font-prompt font-prompt-normal text-black text-lg' fullWidth >
                                <img src={googleImage} className='w-8  h-8 ml-2' alt="" />
                                SIGN IN WITH GOOGLE
                            </Button>
                            <Typography variant="small" className="mt-6  text-[#b7b7b7] flex justify-center">
                                have an account?
                                <Typography onClick={toLogin}
                                    as="a"
                                    href=""
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold text-white"
                                >
                                    Login
                                </Typography>
                            </Typography>
                        </CardFooter>
                    </form>
                </Card>
            </div>
            <div className='flex flex-col justify-center'>
                <div>
                    <img className='w-0 ml-0 lg:w-72 lg:ml-96 lg:mt-10' src={logo} alt="ConnectIn Logo " />
                </div>

                <div className="lg:flex flex-col  lg:justify-center lg:gap-3 lg:ml-18">
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
    )
}

export default Signup