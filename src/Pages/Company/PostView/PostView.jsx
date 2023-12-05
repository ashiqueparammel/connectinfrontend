import { Card, Typography } from '@material-tailwind/react'
import React from 'react'

function PostView() {
    return (
        <div className='flex justify-center'>
            <Card className='bg-[#e7e7e7] rounded-md w-[90%] mt-10  '>
                <div className='xl:ml-28 lg:ml-24 2xl:28 sm:ml-6 md:ml-8 ml-8 mt-6  '>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-2  rounded-md w-[90%]'>
                        <Typography className='font-prompt text-lg ml-6 mt-1 text-black'>Python Developer</Typography>
                        <Typography className='font-prompt text-md ml-6 '>Brototypecalicut india kerala</Typography>
                        <Typography className='font-prompt text-md ml-6 '>Brototypecalicut india kerala</Typography>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-6 rounded-md w-[90%]'>
                        <Typography className='font-prompt text-lg ml-6 mt-2'>About The company</Typography>
                    </Card>
                    <Card className='bg-[#FAFAFA] shadow-2xl mt-6 mb-4  rounded-md w-[90%]'>
                        <Typography className='font-prompt text-lg ml-6 mt-2'>About The Job</Typography>
                    </Card>
                </div>

            </Card>
        </div>
    )
}

export default PostView