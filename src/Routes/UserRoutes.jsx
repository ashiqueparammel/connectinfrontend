import React from 'react'
import Home from '../Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'

function UserRoutes() {
    return (
        <Routes>
            <Route Component={Home} path='/' />
        </Routes>
    )
}

export default UserRoutes