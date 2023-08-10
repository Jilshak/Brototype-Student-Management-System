import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'


function ProtectedRoutes() {


  let authentication = localStorage.getItem('authToken')


  return (
    authentication ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default ProtectedRoutes