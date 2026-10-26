import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = createContext()

const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {

    const [state, setState] = useState(initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)
    const navigate = useNavigate()

    const readProfile = (token) => {

        const jwt = token || localStorage.getItem("jwt")

        if (!jwt) {
            setIsAppLoading(false)
            return
        }

        axios.get("https://task-backend-opal-eta.vercel.app/auth/user", { headers: { Authorization: `Bearer ${jwt}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    setState({ isAuth: true, user: data.user })
                    navigate("/")
                }
            })
            .catch((error) => {
                console.error(error)
                localStorage.removeItem("jwt")
                navigate("/auth/login")
            })
            .finally(() => {
                setIsAppLoading(false)
            })
    }
    useEffect(() => { readProfile() }, [])

    const handleLogout = () => {
        setState(initialState)
        localStorage.removeItem("jwt")
        window.toastify("User Logout Successfully", "success")
    }

    return (
        <Auth.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState, readProfile }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext

export const useAuth = () => useContext(Auth)