import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/sign-up/sign-up';
import Login from './components/login/login';
import HomePage from './components/home-page/home-page';
import NavBar from "./components/navbar/navbar";
import CreatePost from "./components/posts/createPost";
import PageNotFound from "./components/page-not-found/page-not-found";

function App() {
  const userId = localStorage.getItem('userId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post"
          element={
            userId ? <CreatePost /> : <Login />
          }
        />
        <Route exact path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/navbar' element={<NavBar />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
