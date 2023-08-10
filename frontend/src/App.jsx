import './App.css'
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignUpPage from './Pages/SignUpPage'
import SignUpPageStaff from './Pages/SignUpPageStaff'
import AssignMyTimePage from './Pages/AssignMyTimePage'
import UpdateWeekPage from './Pages/UpdateWeekPage'
import SceduleTime from './Pages/SceduleTime'
import DashboardPage from './Pages/DashboardPage'
import NotificationPage from './Pages/NotificationPage'
import WeeksPage from './Pages/WeeksPage'
import Profile from './Pages/Profile'
import ProtectedRoutes from './Utils/ProtectedRoutes'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'


function App() {

  const [decode, setDecode] = useState('')



  useEffect(() => {
    let token = localStorage.getItem('authToken')
    try {
       setDecode(jwtDecode(token))
    } catch (error) {
      console.log("Error decoding the JWT: ", error)
    }

  },[])



  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/signup_staff' element={<SignUpPageStaff />} />

      <Route element={<ProtectedRoutes />}>
        <Route path='/' element={<HomePage />}>

          {/* doing this so that if the admin is logging in
           the first page should be the dashboard */}
          {
            decode.is_superuser ?
              <Route index element={<DashboardPage />} />
              : <Route index element={<Profile />} />
          }

          <Route path='weeks' element={<WeeksPage />} />
          <Route path='notification' element={<NotificationPage />} />
          <Route path='dashboard' element={<DashboardPage />} />
          <Route path='schedule_time' element={<SceduleTime />} />
          <Route path='update_week' element={<UpdateWeekPage />} />
          <Route path='assign_time' element={<AssignMyTimePage />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
