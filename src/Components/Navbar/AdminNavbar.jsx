import React from 'react'
import AppBar from '@mui/material/AppBar';
import { Button, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { resetState } from '../../Redux/Users';




function AdminNavbar({head}) {

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

                <div className='flex justify-between'>
                    <div>
                        <Typography variant="h3"className="text-[#051339] ml-10 mt-5 font-prompt-normal">
                            {head}
                        </Typography>

                    </div>
                    <Button onClick={logout} className='bg-[#dddbdb]  border-[1px] border-[#d4d3d3]  rounded-[100%] mr-10 mt-1'><FontAwesomeIcon icon={faUser} color='#051339' className='w-6 h-10' /></Button>

                </div>


            </AppBar>
        </div>
    )
}

export default AdminNavbar