import { Link, Navigate } from "react-router-dom"
import { Route, Routes } from "react-router"
import { ViewBoard } from "screens/viewboard"
import { TaskGroup } from "screens/taskgroup"

export const ProjectDetail = () => {
    return <div>
        <h1>ProjectDetail</h1>
        <Link to="viewboard">看板</Link>
        <Link to="taskgroup">任务组</Link>
        <Routes>
            <Route path='/viewboard' element={<ViewBoard />}></Route>
            <Route path='/taskgroup' element={<TaskGroup />}></Route>
            <Route index element={<Navigate to='viewboard' />} />
        </Routes>
    </div>
}