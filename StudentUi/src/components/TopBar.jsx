import React from 'react'
import user_icon from '../assets/user.png'
import '../assets/styles/Topbar.css'
const TopBar = () => {
  return (
    <div className='topbar'>
        <div className='user-icon'>
            <img src={user_icon} alt="User-Icon" />
        </div>
        <div className='welcome-message'>
            <h2>Welcome, Manjusha!</h2>
        </div>
    </div>
  )
}

export default TopBar