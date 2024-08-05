import React from 'react';
import { Route, Routes } from "react-router-dom";
import LoginForm from './Components/Login_Signup/LoginForm';
import SignupForm from './Components/Login_Signup/SignupForm';
import Home from './Components/Login_Signup/Home';
import { ToastContainer } from 'react-toastify';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />}/>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
