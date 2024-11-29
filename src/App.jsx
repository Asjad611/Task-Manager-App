import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login1 from './auth/LOGIN1'
import EmployeeDashboard from './Dashboards/EmployeeDashboard'
import AdminDashboard from './Dashboards/AdminDashboard'


function App() {
const [loggedInUserData, setloggedInUserData] = useState(null)
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            
              <Login1 userData={{ loggedInUserData, setloggedInUserData }} />
            
          }
        />
        <Route 
          path="/admin-dashboard"
          element={
            loggedInUserData?.role === 'Admin' ? (
              <AdminDashboard userData={{ loggedInUserData,setloggedInUserData }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/employee-dashboard"
          element={
            loggedInUserData?.role === 'Employee' ? (
              <EmployeeDashboard userData={{ loggedInUserData,setloggedInUserData }} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  )
}

export default App
