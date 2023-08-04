import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const userId = localStorage.getItem('userId');
  let posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);
  } else {
    localStorage.setItem('posts', []);
  }

  const handlePost = () => {
    posts.push({
      id: posts.length + 1,
      userId,
      title,
      body: description,
      comments: []
    });
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('Post Created Successfully');
    navigate('/');
  }

  return (
    <div className='center d-flex justify-content-center align-items-center'>
      <div className="createPost">

        <h2 className="text-center fw-bold">Create a Post</h2>
        <div>
          <label htmlFor="exampleInputEmail1">Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="inputEmail"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1">Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="inputEmail"
            placeholder="Enter an description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary d-flex justify-content-end mt-2"
          onClick={handlePost}
        >
          Publish
        </button>
      </div>
    </div >
  );
}

export default CreatePost