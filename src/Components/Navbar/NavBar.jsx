import React from 'react'
import { Navbar, Typography, IconButton, Button, Input, } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faBriefcase, faMessage, faBell, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Logo from '../../Assets/Frame 20.png'


function NavBar() {
    return (
        <div>
            <AppBar sx={{ backgroundColor: '#051339', position: 'sticky', }}>

                <div className='flex justify-center '>
                    <div>
                        <img className='w-12 h-12 mr-16 mt-[12px]' src={Logo} alt=" logo" />
                    </div>
                    <div>
                        <input
                            className='bg-white w-[300px] h-[40px] mt-4 rounded-sm text-black'
                            type='text'
                            placeholder=' Search'
                        />
                        <Button className='bg-[#051339]'>
                            <FontAwesomeIcon icon={faSearch} className='w-6 h-8' />
                        </Button>
                    </div>




                    <div className='flex justify-between gap-12 ml-44 mb-1'>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faHome} className='w-10 h-8 mt-2' /></Button>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faUsers} className='w-10 h-8 mt-2' /></Button>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faBriefcase} className='w-10 h-8 mt-2' /></Button>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faMessage} className='w-10 h-8 mt-2' /></Button>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faBell} className='w-10 h-8 mt-2' /></Button>
                        <Button className='bg-[#051339]'><FontAwesomeIcon icon={faUser} className='w-10 h-8 mt-2' /></Button>
                    </div>
                </div>
            </AppBar>

        </div>
    )
}

export default NavBar





