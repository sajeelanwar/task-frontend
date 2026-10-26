import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import Auth from './Auth'
import Dashboard from './Dashboard'
import ProtectedRoute from '../components/Misc/ProtectedRoute.jsx'

import { useAuth } from '../context/Auth'

const Index = () => {
    const { isAuth } = useAuth()

    return (
        <>
            <Routes>
                <Route path='/auth/*' element={!isAuth ? <Auth /> : <Navigate to="/" />} />
                <Route path='/*' element={<ProtectedRoute Component={Dashboard} />} />
            </Routes>
        </>
    )
}

export default Index