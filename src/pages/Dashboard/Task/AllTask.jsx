import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Title, Text } = Typography

const AllTask = () => {

    const [tasks, setTasks] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setIsProcessing(true)
        const token = localStorage.getItem("jwt")

        axios.get("https://task-backend-opal-eta.vercel.app/tasks/all", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const { tasks } = data
                    setTasks(tasks.map(task => ({ ...task, key: task.id })))
                }
            })
            .catch(err => {
                console.error(err)
                window.toastify(err.response?.data?.message || "Something went wrong while getting tasks", "error")
            })
            .finally(() => {
                setIsProcessing(false)
            })
    }, [])

    const handleDelete = taskObj => {

        const token = localStorage.getItem("jwt")

        axios.delete(`https://task-backend-opal-eta.vercel.app/tasks/delete/${taskObj.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                const { status, data } = res
                if (status === 200) {
                    const filteredTasks = tasks.filter(t => t.id !== taskObj.id)
                    setTasks(filteredTasks)
                    window.toastify(data.message || "Task has been successfully deleted", "success")
                }
            })
            .catch(err => {
                console.error(err)
                window.toastify(err.response?.data?.message || "Something went wrong while deleting task", "error")
            })

    }

    const columns = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Due Date', dataIndex: 'dueDate' },
        { title: 'Description', dataIndex: 'description' },
        { title: 'Priority', dataIndex: 'priority', render: (text) => <Text className='capitalize'>{text}</Text> },
        { title: 'Status', dataIndex: 'status', render: (text) => <Text className='capitalize'>{text}</Text> },
        { title: 'Date Created', dataIndex: 'createdAt', render: (text) => <Text className='capitalize'>{dayjs(text).format("dddd DD-MM-YYYY, hh:mm:ss A")}</Text> },
        {
            title: 'Action',
            render: (_, taskObj) => (
                <Dropdown menu={{
                    items: [
                        { label: "Edit", key: "edit", icon: <EditOutlined />, onClick: () => { navigate(`/tasks/edit/${taskObj.id}`) } },
                        { label: "Delete", key: "delete", icon: <DeleteOutlined />, onClick: () => { handleDelete(taskObj) } }
                    ]
                }} trigger={["click"]}>
                    <Button className='border-0!' icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <main className='py-5'>
            <div className="w-4/5 mx-auto">
                <div className='flex items-center justify-between mb-4'>
                    <Title level={2} className='mb-0!'>Tasks</Title>
                    <Button type='primary' onClick={() => { navigate("/tasks/add") }}>Add Task</Button>
                </div>
                <Table columns={columns} dataSource={tasks} loading={isProcessing} />
            </div>
        </main>
    )
}

export default AllTask