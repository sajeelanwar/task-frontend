import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Task from './Task'

const Dashboard = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='tasks/*' element={<Task />} />
            </Routes>
        </>
    )
}

export default Dashboard