import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './layouts/layout'
import HomePage from './pages/HomePage'
import AuthCallBackPage from './pages/AuthCallBackPage'
import UserProfilePage from './pages/UserProfilePage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Layout showHero><HomePage /></Layout>}/>
        <Route path="/auth-callback" element={<AuthCallBackPage />}/>
        <Route path="/user-profile" element={<Layout><UserProfilePage /></Layout>}/>
        // Catch all route
        <Route path="*" element={<Navigate to="/" />}/>
    </Routes>
  )
}

export default AppRoutes