import React, { useState, useEffect } from "react"
import './login.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (data) => {
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users): [];
    const isUserExists = users.find((user) => user.email == email && user.password == password);

    if (!isUserExists) {
      alert('Invalid Email or Password');
      return;
    }
    localStorage.setItem('userId', isUserExists?.id);
    navigate('/');
  }
  return (
    <div className='center d-flex justify-content-center align-items-center'>
      <div className="login">
        <div>
          <h2 className="text-center fw-bold">Login</h2>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="inputEmail"
            placeholder="Enter an Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="inputPassword"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid gap-2">
          <button
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <a href="/signup" className="link-primary d-flex justify-content-end mt-2"><small>Create Account</small></a>
      </div>
    </div>
  )

};
export default Login