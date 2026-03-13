import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from './components/TopBar'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm';

const App = () => {
  return (
    <div>
      <TopBar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentList/>}/> 
          <Route path='/students/list' element={<StudentList/>}/> 
          <Route path="/students/create" element={<StudentForm/>} />
          <Route path="/students/create/:id" element={<StudentForm/>} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App