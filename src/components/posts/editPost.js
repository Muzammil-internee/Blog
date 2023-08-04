import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


const EditPost = (post) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.body);


  const handlePost = (data) => {
    axios.post("https://jsonplaceholder.typicode.com/posts", {
      title,
      body: description
    }).then(res => {
      alert('Post Created Successfully');
      navigate('/');
    }).catch(e => alert('Something Went Wrong...'))
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
            value={title}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary d-flex justify-content-end mt-2"
          onClick={handlePost}
        >
          Update Post
        </button>
      </div>
    </div >
  );
}

export default EditPost