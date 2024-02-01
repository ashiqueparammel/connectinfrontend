import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import FirstPage from './Pages/FirstPage/FirstPage';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import ProtectedRoutes from './Routes/Protected/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
import UserRoutes from './Routes/UserRoutes';
import CompanyRoutes from './Routes/CompanyRoutes';
import AdminRout from './Routes/AdminRout';



function App() {


  return (
    <div>
      <Router>

        <Routes>
          <Route element={<FirstPage />} path='/choose' />
          <Route element={<Signup />} path='/signup' />
          <Route element={<ConfirmEmail />} path='/verification' />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Login />} path='/login' />
          </Route>
          <Route element={<UserRoutes />} path='/*' />
          <Route element={<AdminRout />} path='/admin/*' />
          <Route element={<CompanyRoutes />} path='/company/*' />


        </Routes>

      </Router>

      <ToastContainer />
    </div>
  )
}

export default App
