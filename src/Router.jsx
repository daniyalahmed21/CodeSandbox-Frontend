import React from 'react'
import CreateProject from "Pages/createProject";
import ProjectPlayground from 'Pages/ProjectPlayground';
import { Route, Routes } from 'react-router'

const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<CreateProject/>}/>
        <Route path='/projects/:id' element={<ProjectPlayground/>}/>
    </Routes>
  )
}

export default Router