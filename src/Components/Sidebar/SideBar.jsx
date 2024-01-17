import { Button } from '@material-tailwind/react';
import logo from '../../Assets/ConnectWhitelogo.png';

import React from 'react'
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate()


    return (
        <div >

            <div className='w-[280px] h-[720px] bg-[#051339]' >
                <div>
                    <img src={logo} alt="Connect Logo" />
                </div>

                <div className='flex flex-col gap-4 mt-20'>
                    <Button onClick={() => navigate('/')} variant="filled" className='bg-[#0A3863] font-roboto-mono  text-xl font-prompt-normal ml-2 w-[260px]'  >
                        DASHBOARD
                    </Button>
                    <Button onClick={() => navigate('/admin/user')} variant="filled" className='bg-[#0A3863] font-roboto-mono text-xl font-prompt-normal ml-2 w-[260px]'  >
                        USER
                    </Button>
                    <Button onClick={() => navigate('/admin/company')} variant="filled" className='bg-[#0A3863] font-roboto-mono text-xl font-prompt-normal ml-2 w-[260px]'  >
                        COMPANY
                    </Button>
                    {/* <Button onClick={() => navigate('/admin/skills')}  variant="filled" className='bg-[#0A3863] font-roboto-mono text-xl font-prompt-normal ml-2 w-[260px]'  >
                        SKILLS
                    </Button> */}
                    <Button onClick={() => navigate('/admin/jobreports')}  variant="filled" className='bg-[#0A3863] font-roboto-mono text-xl font-prompt-normal ml-2 w-[260px]'  >
                        JOB REPORTS
                    </Button>
                    <Button onClick={() => navigate('/admin/postreports')}  variant="filled" className='bg-[#0A3863] font-roboto-mono text-xl font-prompt-normal ml-2 w-[260px]'  >
                        POST REPORTS
                    </Button>

                    

                </div>

            </div>

        </div>
    )
}

export default Sidebar