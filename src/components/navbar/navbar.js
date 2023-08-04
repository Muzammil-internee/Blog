import React from "react";
// import { useNavigate } from "react-router-dom";

const NavBar = (data) => {
  const { userId } = data;
  // const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold">Blog</a>

          <div className="collapse navbar-collapse  justify-content-end me-4" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link text-white fw-bold" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white fw-bold" href="/create-post">Create a Post</a>
              </li>
              {
                !userId &&
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold me-3" href="/login">Log in</a>
                </li>
              }
              {
                userId &&
                <li className="nav-item">
                  <a className="nav-link text-white fw-bold me-3" onClick={() => {
                    localStorage.setItem('userId', '');
                    // navigate('/');
                  }} href="/">Logout</a>
                </li>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar