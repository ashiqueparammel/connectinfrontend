import { Button, Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import AppliedImage from '../../../Assets/AppliedImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader'



function Applied() {
    const location = useLocation()
    const email = location.state.data || ''
    const navigate = useNavigate()
    const [LoadingManage, setLoadingManage] = useState(false)


    useEffect(() => {
        setLoadingManage(true)
        if (AppliedImage) {
            setLoadingManage(false)
        }


    }, [])

    return (
        <div className='flex justify-center'>

            <>
                {(LoadingManage ? <div className='absolute ml-[50%] mt-[20%] bg-opacity-50 items-center '><Loader /></div> : '')}
            </>
            <Card className='w-[55%] mt-12  rounded-md  mb-12 bg-white border-[1px] shadow-xl border-[#a2a0a0]'>
                <div className='flex flex-col text-center'>
                    <div className='flex justify-center '>
                        <img src={AppliedImage} alt="Applied Image" className='w-[50%]' />
                    </div>
                    <div className='mb-4' >
                        <Typography className=' text-black font-Kantumruy font-prompt-semibold' variant='h2'>
                            Your application has been <br />
                            submitted!
                        </Typography>
                        <div className='flex justify-center '>
                            <FontAwesomeIcon icon={faCheck} color='#03910a' className=' w-8 h-8 mt-4 mr-2    ' />
                            <Typography className='text-[#5b5a5a]  font-Kantumruy' variant='h4'>
                                You will get an email confirmation at <br />
                                <span className='text-black font-prompt-normal text-2xl'>{email}</span>
                            </Typography>
                        </div>
                        <br />
                        <Typography onClick={(e) => navigate('/myitems')} className='text-black font-prompt-normal hover:text-[#5f5d5d] hover:cursor-pointer text-2xl' variant='h4'>
                            View your applications on My Jobs
                        </Typography>
                        <br />
                        <Button onClick={(e) => navigate('/jobs')} className='bg-[#0A3863] w-[40%] h-[17%] text-lg rounded-sm font-prompt-normal'>Return to Job Search </Button>
                        <br />
                        <br />
                        <br />

                    </div>
                </div>

            </Card>
        </div>
    )
}

export default Applied