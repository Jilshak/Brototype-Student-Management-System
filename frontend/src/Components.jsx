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
import BatchPage from './Pages/BatchPage'
import AdvisorsPage from './Pages/AdvisorsPage'
import ReviewersPage from './Pages/ReviewersPage'
import BatchStudentsPage from './Pages/BatchStudentsPage'
import AuthorizePage from './Pages/AuthorizePage'
import ChatPage from './Pages/ChatPage'
import WeekDetailPage from './Pages/WeekDetailPage'

function Components() {


    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/signup_staff' element={<SignUpPageStaff />} />

            <Route element={<ProtectedRoutes />}>
                <Route path='/' element={<HomePage />}>
                    <Route index element={<Profile />} />
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='authorize' element={<AuthorizePage />} />
                    <Route path='weeks/:id?' element={<WeeksPage />} />
                    <Route path='batch' element={<BatchPage />} />
                    <Route path='advisors' element={<AdvisorsPage />} />
                    <Route path='reviewers' element={<ReviewersPage />} />
                    <Route path='notification' element={<NotificationPage />} />
                    <Route path='dashboard' element={<DashboardPage />} />
                    <Route path='schedule_time' element={<SceduleTime />} />
                    <Route path='update_week' element={<UpdateWeekPage />} />
                    <Route path='assign_time' element={<AssignMyTimePage />} />
                    <Route path='batch_number/:id' element={<BatchStudentsPage />} />
                    <Route path='chat' element={<ChatPage />} />
                    <Route path='week_detail' element={<WeekDetailPage />} />
                </Route>
            </Route>

        </Routes>
    )
}

export default Components