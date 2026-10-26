import { Button, DatePicker, Form, Input, Select, Typography } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './../../../context/Auth'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "", status: "" }
const Add = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let { title, dueDate, description, priority, status } = state

        title = title.trim()
        if (title.length < 3) return window.toastify("Title must be at least 3 characters long", "error")

        const task = { title, dueDate, description, priority, status }

        setIsProcessing(true)

        const token = localStorage.getItem("jwt")

        axios.post("http://localhost:8000/tasks/create", task, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    window.toastify(data.message || "A new task has been sucessfully created", "success")
                    navigate("/tasks")
                    console.log('data.task =>', data.task)
                }
            })
            .catch(err => {
                console.error(err)
                window.toastify(err.response?.data?.message || "Something went wrong while creating a new task", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }

    return (
        <main className='auth-bg flex-center h-screen'>
            <div className='container m-2'>
                <div className='card mx-auto bg-white p-4 lg:p-5 rounded-2xl'>
                    <div className='flex items-center justify-between mb-4'>
                        <Title level={2} className='mb-0!'>Add Task</Title>
                        <Button type='primary' onClick={() => { navigate("/tasks") }}>Tasks</Button>
                    </div>

                    <Form layout='vertical'>
                        <Item label="Title" required>
                            <Input type="text" size='large' placeholder='Enter Task Title' name='title' onChange={handleChange} />
                        </Item>
                        <Item label="Due Date" >
                            <DatePicker size='large' placeholder='Enter Task Due Date' className='w-full' onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                        </Item>
                        <Item label="Description" >
                            <Input.TextArea placeholder='Enter Task Description' name='description' onChange={handleChange} style={{ height: 100, resize: "none" }} />
                        </Item>
                        <Item label="Priority" >
                            <Select size='large' placeholder='Select Task Priority' name='priority' onChange={(priority) => { setState(s => ({ ...s, priority })) }}>
                                <Option value="low">Low</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="high">High</Option>
                            </Select>
                        </Item>
                        <Item label="Status" >
                            <Select size='large' placeholder='Select Task Status' name='status' onChange={(status) => { setState(s => ({ ...s, status })) }}>
                                <Option value="pending">Pending</Option>
                                <Option value="in progress">In Progress</Option>
                                <Option value="completed">Completed</Option>
                            </Select>
                        </Item>
                        <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Add Task</Button>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default Add