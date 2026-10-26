import { Button, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '@/context/Auth'

const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = { email: "", password: "" }

const Login = () => {

    const { readProfile } = useAuth()
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleLogin = () => {
        let { email, password } = state

        const userData = { email, password }

        setIsProcessing(true)

        axios.post("http://localhost:8000/auth/login", userData)
            .then((res) => {
                const { status, data } = res
                if (status === 200 || status === 201) {
                    localStorage.setItem("jwt", data.token)
                    window.toastify("Login Successfully", "success")
                    readProfile(data.token)
                } else {
                    window.toastify(data.message, "error")
                }
            })
            .catch(error => {
                console.error(error)
                window.toastify(error?.response?.data?.message || "Something went wrong, Internal server error", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })

    }

    return (
        <>
            <main className='auth-bg flex-center'>
                <div className='container m-2'>
                    <div className='card mx-auto bg-white p-4 lg:p-5 rounded-2xl'>
                        <Title className='text-center'>Login</Title>
                        <Paragraph className='text-center'>Don't have an account? <Link to="/auth/register">Create Account</Link></Paragraph>

                        <Form layout='vertical' onFinish={handleLogin}>
                            <Item label="Email" required>
                                <Input type="email" size='large' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                            </Item>
                            <Item label="Password" required>
                                <Input.Password size='large' placeholder='Enter Your Password' name='password' onChange={handleChange} />
                            </Item>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing}>Login</Button>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login