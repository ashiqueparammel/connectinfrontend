import React from 'react'
import { Outlet } from 'react-router-dom'

import CompanyNavBar from '../../../Components/Navbar/CompanyNavBar'

function CompanyLayout() {
    return (
        <div className=''>
            <div className=''>
            <CompanyNavBar />
            </div>
            
            <div className='flex flex-col w-full mt-7'>
                <Outlet />
            </div>

        </div>
    )
}

export default CompanyLayout

