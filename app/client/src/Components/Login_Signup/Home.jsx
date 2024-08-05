import React, { useEffect } from 'react'
import "./LoginStyle.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/auth/verify')
    .then(res => {
      if(res.data.status){

      } else {
        navigate('/login')
      }
    })
  })

  const handleLogout = () => {
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if(res.data.status) {
        navigate('/login')
        toast.success('Logout Successful', {
          theme: "dark",
          position: "bottom-center",
          autoClose: 1800,
          hideProgressBar: true,
          pauseOnHover: true,
        }); 
      }
    }) .catch(err => {
      console.log(err)
      if (err.response && err.response.status === 401) {
        toast.error('Logout Failed', {
          theme: "dark",
          position: "bottom-center",
          autoClose: 1800,
          hideProgressBar: true,
          pauseOnHover: true,
        });
      }
    })
  }

  return (
    <div id='homeContainer'>
      <div className='homie'>Home</div> <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
    
  )
}

export default Home