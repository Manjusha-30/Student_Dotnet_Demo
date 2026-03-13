import React, { useState,useEffect } from 'react'
import { useNavigate,useParams } from "react-router-dom";
import {api} from '../api.js';
import '../assets/styles/StudentForm.css'

const StudentForm = () => {
  
  const navigate = useNavigate();

  const empty = { name: '', email: '', age: '' };
  const [form, setForm] = useState(empty);
  const [error, setError] = useState(''); 
  const { id } = useParams();          // undefined for /students/create
  const isEditing = Boolean(id);

  
  useEffect(() => {
      setError('');
      if (isEditing) {
        (async () => {
          try {
            const res = await api.get(`/Students/${id}`);
            const s = res.data;
            setForm({ id: s.id, name: s.name, email: s.email, age: s.age });
          } catch (e) {
            console.error(e);
            setError('Failed to load student');
          }
        })();
      } else {
        setForm(empty);
      }
    }, [isEditing, id]);


    function onChange(e) {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: name === 'age' ? (value ? Number(value) : '') : value }));
    }

    async function onSubmit(e) {
      e.preventDefault();  //stop browser's default action to perform like reloading page
      setError('');

      if (!form.name || !form.email || !form.age) {
        setError('Please fill all fields');
        return;
      }

      try {
        if (isEditing) {
          await api.put(`/Students/${form.id}`, {
            id: form.id,
            name: form.name,
            email: form.email,
            age: Number(form.age)
          });
        } else {
          await api.post('/Students', {
            name: form.name,
            email: form.email,
            age: Number(form.age)
          });
        }
        setForm(empty);
        navigate('/'); 
      } 
      catch (e) {
        
        console.error(e);

        if (e.response && e.response.data) {
            setError(e.response.data); 
          } else {
            setError('Save failed');
          }

        }
     }

    function cancel() {
      setForm(empty);
      navigate('/');
      setError('');
    }

  return (
    
    <div className='student-form-section'>
        <h1>Student Data</h1>
        <div className='student-form'>
          <form onSubmit={onSubmit} >
            <input name="name" placeholder="Name" value={form.name} onChange={onChange} />
            <input name="email" placeholder="Email" value={form.email} onChange={onChange} />
            <input name="age" type="number" placeholder="Age" value={form.age} onChange={onChange} />
            <div className='form-buttons'>
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            {isEditing && <button type="button" onClick={cancel}>Cancel</button>}
            </div>
        </form>
        </div>
        {error && <div className='error-msg'>{error}</div>}
    </div>
  )
}

export default StudentForm