import React, { useState,useEffect } from 'react'
import { useNavigate,Link } from "react-router-dom";
import '../assets/styles/StudentList.css'
import {api} from '../api.js';
import '../script/StudentList.js'
import KebabMenu from '../components/KebabMenu';
import addIcon from '../assets/add.png';

const StudentList = () => {

    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    async function load() {
        try {
            setLoading(true);
            const res = await api.get('/Students');
            setStudents(res.data);
        } catch (e) {
            console.error(e);
            setError('Failed to load students');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load(); }, []);


    async function onDelete(id) {
          if (!confirm('Delete this student?')) return;
          try {
            await api.delete(`/Students/${id}`);
            await load();
          } catch (e) {
            console.error(e);
            setError('Delete failed');
          }
        }

  return (
    <div className='student-list-section'>
        <div className='header'>
            <h1>Student List</h1>
            
            <Link to="/Students/create" className='create-button'>
                <img src={addIcon} alt="Add Student" width="16" height="16" /><span>Create</span>
            </Link>

        </div>

        {error && <div className='error-msg'>{error}</div>}

        <div className='list-table'>
            {loading ? <p>Loading...</p> : (
                <table border="1" cellPadding="8">
                    <thead>
                        <tr><th>Id</th><th>Name</th><th>Email</th><th>Age</th><th>Actions</th></tr>
                    </thead>
                    <tbody >
                        {students.length === 0 ? (
                        <tr><td colSpan="5">No students yet</td></tr>
                        ) : students.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.email}</td>
                            <td>{s.age}</td>
                            <td><KebabMenu onEdit={() => navigate(`/Students/create/${s.id}`)}
                                           onDelete={() => onDelete(s.id)} /></td>

                        </tr>
                        ))}
                    </tbody>
                </table>
        )}
        </div>
    </div>
  )
}

export default StudentList