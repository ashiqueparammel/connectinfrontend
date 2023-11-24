import React from 'react'
import logo from '../../Assets/Connectlogo.png';
import mainImage from '../../Assets/Startpage.png';
import hiring from '../../Assets/Hiring.jpg'
import searching from '../../Assets/Searching.jpg'
import { Card, CardHeader, CardBody, Button } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';



function FirstPage() {
    const navigate = useNavigate();
    // const { userInfo } = useSelector((state) => state.user)
    // console.log(userInfo.is_superuser, 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjaaa');

    // useEffect(() => {
    //     if (userInfo) {
    //         if (userInfo.is_superuser) {
    //             console.log('ggggggggggggggggggggggggggggggggggg');
    //             navigate('/admin/');

    //         }
    //         else if (userInfo.is_company) {
    //             navigate('/company/');
    //         }
    //         else {
    //             navigate('/');
    //         }
    //     }
    // }, [userInfo])
    

    const hiringSignup = () => {
        
        navigate('/signup', { state: { data: true } })
        
    }
    const normalSignup = () => {
        navigate('/signup', { state: { data: false } })
    }


    return (
        <div className='lg:flex-col'>
            <div className='lg:w-72  w-36  ml-6 mt-6  '>
                <img src={logo} alt="Connect in Logo" />
            </div>
            <div className="lg:flex lg:justify-between">
                <p className="font-prompt text-3xl lg:text-6xl  text-zinc-400 ml-6 mt-4 lg:mt-20">
                    Hy, welcome! Which role are you looking?
                </p>
                <div className=' w-[380px] h-[200px] lg:w-[1500px]  lg:h-[450px]'>
                    <img src={mainImage} alt="Connect in Logo" className='w-full h-full object-cover' />
                </div>
            </div>
            <div className='flex flex-col  gap-5  lg:flex-row lg: lg:justify-evenly lg:mb-5'>
                <Card className="mt-6 lg:mt-20 w-full lg:w-96 bg-[#F5F5F5] flex items-center" >
                    <CardHeader color="blue-gray" className="relative h-50 mt-5">
                        <img
                            src={hiring}
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Button onClick={hiringSignup} className="font-prompt bg-[#051339] font-prompt-semibold mb-2 w-full lg:w-[150px]">
                            HIRING JOB
                        </Button>
                    </CardBody>
                </Card>
                <Card className="mt-6 lg:mt-20 w-full lg:w-96 bg-[#F5F5F5] flex items-center" >
                    <CardHeader color="blue-gray" className="relative h-50 mt-5">
                        <img
                            src={searching}
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody>
                        <Button onClick={normalSignup} className="font-prompt bg-[#051339] font-prompt-semibold mb-2 w-full lg:w-[180px]">
                            SEARCHING JOB
                        </Button>
                    </CardBody>
                </Card>
            </div>
            <br />
        </div>
    )
}

export default FirstPage