import React, { useState } from "react"
import './sign-up.css';
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate();
  const [name, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let users = localStorage.getItem('users');
    users = users? JSON.parse(users): [];
    const isUserExists = users?.find((user) => user.email == email);
    if (isUserExists) {
      alert('User Already exists');
      return;
    }
    const id = users?.length + 1;
    users.push({
      id,
      name,
      email,
      password
    });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userId', id);
    navigate('/');
  }
  return (
    <div className='center-signup d-flex justify-content-center align-items-center'>
      <div className="register">
        <form onSubmit={handleFormSubmit}>
          <div>
            <h2 className="text-center fw-bold ">Register</h2>
          </div>
          <div className="mb-3">
            <label htmlFor="nameInput">Name</label>
            <input type="text"
              name="name"
              className="form-control"
              id="inputName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Please Enter Your Name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput">Email</label>
            <input type="text"
              name="email"
              className="form-control"
              id="inputEmail"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please Enter Your Email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password"
              name="password"
              className="form-control"
              id="inputPassword"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Please Enter Your Password"
            />
          </div>
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="submit">Register</button>
          </div>
          <a href="/login" className="link-primary d-flex justify-content-end mt-2" ><small>Already have account</small></a>
        </form>
      </div>
    </div>
  )
}

export default Register