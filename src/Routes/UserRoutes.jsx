import React from 'react'
import Home from '../Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UserProtected from './Protected/UserProtected'


function UserRoutes() {
    return (

        <Routes>
            <Route element={<UserProtected />}>
            <Route element={Home} path='/' />
            </Route>
        </Routes>
    )
}

export default UserRoutes