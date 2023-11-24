import React from 'react'
import AppBar from '@mui/material/AppBar';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../../Redux/Users';




function AdminNavbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(resetState);
        navigate('/login');
    }


    return (
        <div>
            <AppBar sx={{ backgroundColor: '#f2f2f2', position: 'sticky', }} className='flex flex-row h-20'>

                <div className='flex flex-row gap-10'>
                    <div className="w-full md:w-72 mt-5 ml-52" >
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5 justify-center" />}
                        />
                    </div>
                    <Button onClick={logout} className='bg-[#f2f2f2] rounded-[50%] ml-[550px] mt-2'><FontAwesomeIcon icon={faUser} color='#051339' className='w-6 h-10' /></Button>

                </div>


            </AppBar>
        </div>
    )
}

export default AdminNavbar