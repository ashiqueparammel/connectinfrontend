import React from 'react'
import NavBar from '../../Components/Navbar/NavBar'
import { Button } from '@material-tailwind/react';

function Home() {
    console.log(localStorage);
    // const token = localStorage.getItem('token')
    const logout = () => {
        localStorage.removeItem('token')
        
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