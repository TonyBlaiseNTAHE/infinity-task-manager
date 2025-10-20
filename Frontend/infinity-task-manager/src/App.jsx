import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/login';
import SignUp from './pages/Auth/signUp';
import ManageTasks from './pages/Admin/manageTasks';
import CreateTask from './pages/Admin/createTask';
import ManageEmployee from './pages/Admin/manageEmployee';
import EmployeeDashBoard from './pages/Employee/EmployeeDashBoard';
import MyTasks from './pages/Employee/myTasks';
import ViewTaskDetails from './pages/Employee/ViewTaskDetails';
import PrivateRoute from './routes/privateRoute';
import AdminDashBoard from './pages/Admin/AdminDashBoard';


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/signUp' element={<SignUp/>} />

            {/*Admin Routes*/}
          <Route element={<PrivateRoute allowedRoles={"admin"}/>}/>
            <Route path='/admin/dashboard' element={<AdminDashBoard/>} />
            <Route path='/admin/tasks' element={<ManageTasks/>} />
            <Route path='/admin/create-task' element={<CreateTask/>} />
            <Route path='/admin/employee' element={<ManageEmployee/>} />
          <Route/>

          {/*Employee Routes*/}
          <Route element={<PrivateRoute allowedRoles={"admin"}/>}/>
            <Route path='/employee/dashboard' element={<EmployeeDashBoard/>} />
            <Route path='/employee/tasks' element={<MyTasks/>} />
            <Route path='/employee/tasks-details/:id' element={<ViewTaskDetails/>} />
          <Route/>


      
                
        </Routes>
      </Router>
    </div>
  )
}

export default App
