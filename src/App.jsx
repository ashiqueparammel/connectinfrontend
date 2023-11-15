import { useState } from 'react'
import { Card, Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FirstPage from './Pages/FirstPage/FirstPage';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={FirstPage} path='/start'/>
          <Route Component={Signup} path='/signup'/>
          <Route Component={Login} path='/login'/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
