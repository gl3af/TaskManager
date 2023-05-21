import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Teams from "./pages/Teams";
import CreateTeam from "./pages/CreateTeam";
import Register from "./pages/Register";
import TeamPage from "./pages/TeamPage";
import CreateTask from "./pages/CreateTask";
import TaskPage from "./pages/TaskPage";
import CreateSubtask from "./pages/CreateSubtask";
import AddExecutor from "./pages/AddExecutor";
import Notifications from "./pages/Notifications";

export const useRoutes = (logged: boolean) => {
  if (logged) {
    return (
      <Routes>
        <Route path="/">
          <Route index element={<Home/>}/>

          <Route path="teams/">
            <Route index element={<Teams/>}/>
            <Route path="create" element={<CreateTeam />}/>
            <Route path=":id/">
              <Route index element={<TeamPage/>}/>
              <Route path="tasks/create" element={<CreateTask/>}/>
            </Route>
          </Route>

          <Route path="tasks/">
            <Route index element={<Teams/>}/>
            <Route path=":id" element={<TaskPage />}/>
            <Route path=":id/subtasks/create" element={<CreateSubtask />}/>
            <Route path=":id/add-executor" element={<AddExecutor />}/>
          </Route>

          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Route>
      </Routes>
    )
  }

  return (
    <>
      <Routes>
        <Route path="*" element={ <Navigate to="./" /> }/>
        <Route path="/" element={ <Login /> }/>
        <Route path="/register" element={ <Register /> }/>
      </Routes>
    </>
  )
}