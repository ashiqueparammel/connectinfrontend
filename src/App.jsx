import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import FirstPage from './Pages/FirstPage/FirstPage';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import ProtectedRoutes from './Routes/Protected/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';

function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/*' element={<ProtectedRoutes />}></Route>
          <Route Component={FirstPage} path='/choose' />
          <Route Component={Signup} path='/signup' />
          <Route Component={Login} path='/login' />
          <Route Component={ConfirmEmail} path='/verification' />
        
        </Routes>

      </BrowserRouter>

      <ToastContainer />
    </>
  )
}

export default App
