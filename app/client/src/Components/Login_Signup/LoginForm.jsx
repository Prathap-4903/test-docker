import React, { useState } from 'react'
import "./LoginStyle.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styling
//import { response } from 'express';

function LoginForm () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate =  useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password })
            .then(response => {
               if(response.data.status){
               navigate('/home');
               toast.success('Login Successful', {
                 theme: "dark",
                 position: "bottom-center",
                 autoClose: 1800,
                 hideProgressBar: true,
                 pauseOnHover: true,
               }); 
                }
            })  
          } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
              toast.error('Invalid Login', {
                theme: "dark",
                position: "bottom-center",
                autoClose: 1800,
                hideProgressBar: true,
                pauseOnHover: true,
              });
            } else {
              toast.error('Login Failed!', {
                theme: "dark",
                position: "bottom-center",
                autoClose: 1800,
                hideProgressBar: true,
                pauseOnHover: true,
              });
            }
        }
        };

        //axios.post('http://localhost:5000/auth/login', {email, password})
        //.then(response => {
            //toast.success('Login Successful!');
            //navigate('/home')
        //})
        //.catch(err => {
            //console.log(err)
        //})
    //}

    function gotoregister () {
        navigate('/signup')
    }

  return (
    <div>
        <div className='login_page'>
            <div className="container" id="loginContainer">
                <div className="title">Login</div>
                <div className="content">
                <form action="" onSubmit={handleSubmit} id="loginForm" method="post">
                    <div className="user-details">
                    <div className="input-box">
                        <span className="details">Email</span>
                        <input type="text" placeholder="Enter Your Email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="input-box">
                        <span className="details">Password</span>
                        <input type="password" placeholder="Enter Your Password" name="password" onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    </div>
                    {/*Registration page link*/}
                    <p className="acc">Does not have a Account? <br />
                    <span className="register-link" onClick={gotoregister}>Register Here</span>
                    </p>
                    <div className="button">
                    <button type="submit" className="logbtn" name="login">Login</button>
                    </div>
                </form>
                </div>
            </div>
        </div>

            {/*<button onClick={handleClick}>Go to Register Page</button>*/}
    </div>
  )
}

export default LoginForm