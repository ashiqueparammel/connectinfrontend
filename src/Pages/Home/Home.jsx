import React from 'react'
import NavBar from '../../Components/Navbar/NavBar'
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';

function Home() {
    console.log(localStorage);
    const navigate = useNavigate()
    // const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login');

    }

    return (
        <div>
            <NavBar />
            <div>Home</div>
            <Button onClick={logout}> logout</Button>
        </div>
    )
}

export default Home