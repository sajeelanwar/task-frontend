import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AllTask from './AllTask'
import Add from './Add'
import EditTask from './EditTask'


const Task = () => {
    return (
        <>
            <main>
                <Routes>
                    <Route path='/' element={<AllTask />} />
                    <Route path='/add' element={<Add />} />
                    <Route path='/edit/:id' element={<EditTask />} />
                </Routes>
            </main>
        </>
    )
}

export default Task