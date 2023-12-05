import React from 'react'
import Home from '../Pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UserProtected from './Protected/UserProtected'
import UserLayout from '../Pages/User/UserLayout/UserLayout'
import UserHome from '../Pages/Home/UserHome'
import UserMyItems from '../Pages/User/MyItems/UserMyItems'



function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route element={<UserProtected />}>
                <Route element={<UserLayout />}>
                    <Route element={<UserHome />} path='/' />
                    <Route element={<UserMyItems />} path='/myitems' />
                </Route>
                </Route>
            </Routes>
        </div>

    )
}

export default UserRoutes

