import React from 'react'
import { Card, CardBody, CardFooter, Typography, Input, Button } from "@material-tailwind/react";
import googleImage from '../../Assets/googleAuth.png'
import logo from '../../Assets/Connectlogo.png';
import SignupImage from '../../Assets/SignupImage.png'

function Login() {


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

                <Card className="w-96  bg-[#051339]  lg:ml-10 ml-5 mt-5 lg:mt-28" >
                    <Typography variant="h3" className='text-center font-roboto-mono text-3xl  mt-5' color="white">
                        LOGIN
                    </Typography>
                    <CardBody className="flex flex-col font-prompt gap-5">
                        <Input label="Enter Your Email or Phonenumber" size="lg" className='bg-white' />
                        <Input label="Enter Your Password" size="lg" className='bg-white' />
                        <div className="-ml-2.5">
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button variant="filled" className='bg-[#0A3863] font-prompt text-xl font-prompt-normal' fullWidth >
                            LOGIN
                        </Button>
                        <p className='text-white ml-2 mt-2'>_______________  or  __________________</p>
                        <br />
                        <Button variant="filled" className=' flex bg-[#ffffff] gap-5 font-prompt font-prompt-normal text-black text-lg' fullWidth >
                            <img src={googleImage} className='w-8  h-8 ml-2' alt="" />
                            SIGN IN WITH GOOGLE
                        </Button>

                        <Button variant="filled" className='bg-[#0A3863] font-prompt text-sm font-prompt-xlight mt-5' fullWidth >
                            New connection?Join Now
                        </Button>
                    </CardFooter>
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
        </div>
    )
}

export default Login
