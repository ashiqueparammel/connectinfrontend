import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../../Components/Navbar/NavBar'

function CompanyLayout() {
    return (
        <div className=''>
            <div className=''>
            <NavBar />
            </div>
            
            <div className='flex flex-col w-full mt-7'>
                <Outlet />
            </div>

        </div>
    )
}

export default CompanyLayout

