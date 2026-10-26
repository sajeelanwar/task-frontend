import { Button, DatePicker, Form, Input, Select, Typography } from 'antd'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import axios from 'axios'

const { Title } = Typography
const { Item } = Form
const { Option } = Select

const initialState = { title: "", dueDate: "", description: "", priority: "", status: "" }
const EditTask = () => {

    const [state, setState] = useState(initialState)
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        const { id } = params

        const token = localStorage.getItem("jwt")

        axios.get(`http://localhost:8000/tasks/single/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { task } = data
                    setState(task)
                }
            })
            .catch(err => {
                console.error(err)
                window.toastify(err.response?.data?.message || "Something went wrong while getting task", "error")
            })
    }, [params])

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        let { id, title, dueDate, description, priority, status } = state

        title = title.trim()
        if (title.length < 3) return window.toastify("Title must be at least 3 characters long", "error")

        const task = { id, title, dueDate, description, priority, status }

        setIsProcessing(true)
        const token = localStorage.getItem("jwt")
        axios.patch("http://localhost:8000/tasks/update", task, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { task } = data
                    console.log('task', task)
                    navigate("/tasks")
                    window.toastify(data.message || "Task has been sucessfully updated", "success")
                }
            })
            .catch(err => {
                console.error(err)
                window.toastify(err.response?.data?.message || "Something went wrong while updating task", "error")
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
                        <Title level={2} className='mb-0!'>Update Task</Title>
                        <Button type='primary' onClick={() => { navigate("/dashboard/tasks") }}>Tasks</Button>
                    </div>

                    <Form layout='vertical'>
                        <Item label="Title" required>
                            <Input type="text" size='large' placeholder='Enter Task Title' value={state.title} name='title' onChange={handleChange} />
                        </Item>
                        <Item label="Due Date" >
                            <DatePicker size='large' placeholder='Enter Task Due Date' className='w-full' value={state.dueDate ? dayjs(state.dueDate) : null} onChange={(obj, dueDate) => { setState(s => ({ ...s, dueDate })) }} />
                        </Item>
                        <Item label="Description" >
                            <Input.TextArea placeholder='Enter Task Description' value={state.description} name='description' onChange={handleChange} style={{ height: 100, resize: "none" }} />
                        </Item>
                        <Item label="Priority" >
                            <Select size='large' placeholder='Select Task Priority' value={state.priority} name='priority' onChange={(priority) => { setState(s => ({ ...s, priority })) }}>
                                <Option value="low">Low</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="high">High</Option>
                            </Select>
                        </Item>
                        <Item label="Status">
                            <Select size='large' placeholder='Select Task Status' value={state.status} name='status' onChange={(status) => { setState(s => ({ ...s, status })) }}>
                                <Option value="pending">Pending</Option>
                                <Option value="in progress">In Progress</Option>
                                <Option value="completed">Completed</Option>
                            </Select>
                        </Item>
                        <Button type='primary' size='large' block htmlType='submit' loading={isProcessing} onClick={handleSubmit}>Update Task</Button>
                    </Form>
                </div>
            </div>
        </main>
    )
}

export default EditTask