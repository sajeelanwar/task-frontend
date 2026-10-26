import { Button, Form, Input, Typography } from 'antd'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography
const { Item } = Form

const initialState = { fullName: "", email: "", password: "", confirmPassword: "" }

const Register = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)
    const navigate = useNavigate()

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleRegister = () => {
        let { fullName, email, password, confirmPassword } = state

        fullName = fullName.trim()
        if (fullName.length < 3) return window.toastify("Please Enter Your Full Name", "error")
        if (!(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email))) return window.toastify("Please Enter Your valid Email", "error")
        if (password.length < 6) return window.toastify("Password must be at least 6 chars", "error")
        if (confirmPassword !== password) return window.toastify("Password not match", "error")

        const user = { fullName, email, password }

        setIsProcessing(true)

        axios.post("https://task-backend-opal-eta.vercel.app/auth/register", user)
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    navigate("/auth/login")
                    return window.toastify(data.message, "success")
                }
            })
            .catch((error) => {
                console.error(error)
                const { status, data } = error.response
                if (status === 401) {
                    return window.toastify(data.message, "error")
                }
                return window.toastify("Something went wrong", "error")
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
                        <Title className='text-center'>Register</Title>
                        <Paragraph className='text-center'>Alredy have an account? <Link to="/auth/login">Login</Link></Paragraph>

                        <Form layout='vertical'>
                            <Item label="Full Name" required>
                                <Input type="text" size='large' placeholder='Enter Your Full Name' name='fullName' onChange={handleChange} />
                            </Item>
                            <Item label="Email" required>
                                <Input type="email" size='large' placeholder='Enter Your Email' name='email' onChange={handleChange} />
                            </Item>
                            <Item label="Password" required>
                                <Input.Password size='large' placeholder='Enter Your Password' name='password' onChange={handleChange} />
                            </Item>
                            <Item label="Confirm Password" required>
                                <Input.Password size='large' placeholder='Enter Your Password Again' name='confirmPassword' onChange={handleChange} />
                            </Item>
                            <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleRegister}>Create Account</Button>
                        </Form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Register