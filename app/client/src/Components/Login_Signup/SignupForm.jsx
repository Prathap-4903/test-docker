import React, { useState } from 'react'
import "./LoginStyle.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast styling

function SignupForm () {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [gender, setGender] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post('http://localhost:5000/auth/signup', {
            name, username, email, phone, password, confirm_password, gender
        });
        navigate('/login');
        toast.success('Signup Successful!', {
            theme: "dark",
            position: "bottom-center",
            autoClose: 1800,
            hideProgressBar: true,
            pauseOnHover: true,
        });
        }
        catch(err) {
            console.error(err);
            toast.error('Signup Failed!', {
                theme: "dark",
                position: "bottom-center",
                autoClose: 1800,
                hideProgressBar: true,
                pauseOnHover: true,
            });
        }

        //.then(response => {
            //navigate('/login')
        //})
        //.catch(err => {
            //console.log(err)
        //})
    }

    function backtologin () {
        navigate('/login')
    }


  return (
    <div>
        <div className="container" id="registerContainer">
            <div className="title">Signup</div>
            <div className="content">
                <form action="" onSubmit={handleSubmit} method="post" id="registerForm">
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Name</span>
                            <input type="text" placeholder="Enter Your Name" name="name" onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Username</span>
                            <input type="text" placeholder="Enter Your Username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Email</span>
                            <input type="text" placeholder="Enter Your Email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Phone Number</span>
                            <input type="text" placeholder="Enter Your Number" name="phone" onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="input-box">
                            <span className="details">Password</span>
                            <input type="password" placeholder="Enter Your Password" name="password" onChange={(e) => setPassword(e.target.value)} autoComplete='off' required/>
                        </div>
                        <div className="input-box">
                            <span className="details">Confirm Password</span>
                            <input type="password" placeholder="Confirm Your Password" name="confirm_password" onChange={(e) => setConfirmPassword(e.target.value)} autoComplete='off' required/>
                        </div>
                    </div>
                    <div className="gender-details">
                        <input type="radio" id="dot-1" name="gender" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} />
                        <input type="radio" id="dot-2" name="gender" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} />
                        <input type="radio" id="dot-3" name="gender" value="others" onChange={(e) => setGender(e.target.value)} checked={gender === 'others'} />
                        <span className="gender-title">Gender</span>
                        <div className="category">
                            <label htmlFor="dot-1">
                                <span className="dot one"></span>
                                <span className="gender">Male</span>
                            </label>
                            <label htmlFor="dot-2">
                                <span className="dot two"></span>
                                <span className="gender">Female</span>
                            </label>
                            <label htmlFor="dot-3">
                                <span className="dot three"></span>
                                <span className="gender">Prefer not to say</span>
                            </label>
                        </div>
                    </div>
                    <div className="button">
                        <button type="submit" className="regbtn" name="submit">Register</button>
                        <center><p className="back-link"><span onClick={backtologin}>Back to login</span></p></center>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignupForm