import React from "react";
import NavBar from "../navbar/navbar";
import Posts from "../posts/posts";
import axios from "axios";
import Modal from '@mui/material/Modal';
import { useState, useEffect } from "react";
import './home-page.css';

const HomePage = () => {
  const userId = localStorage.getItem('userId');
  let posts = localStorage.getItem('posts');
  if (posts) {
    posts = JSON.parse(posts);
  } else {
    localStorage.setItem('posts', []);
  }

  const [localPosts, setLocalPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(false);
  const [description, setDescription] = useState(false);
  const [postId, setPostId] = useState('');
  const [deleteModel, setDeleteModel] = useState();

  const allPosts = async () => {
    let { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
    setLocalPosts(data || []);
    localStorage.setItem('posts', JSON.stringify(data));
  }
  useEffect(() => {
    if (!posts?.length) {
      allPosts();
    } else {
      setLocalPosts(posts);
    }
  }, []);

  return (
    <div >
      <NavBar
        userId={userId}
      />
      <div>
        <h2 className="fw-bold text-center mt-5">Posts</h2>
        <hr />
        <div className="mt-2 flex-wrap">
          {
            localPosts && localPosts.map((post, i) => {
              return (
                <Posts
                  key={post.id}
                  postIndex={i}
                  post={post}
                  posts={localPosts}
                  setOpen={setOpen}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  setPostId={setPostId}
                  setDeleteModel={setDeleteModel}
                />
              )
            })
          }
        </div>
      </div>

      {/* update Post Model */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div className='center d-flex justify-content-center align-items-center'>
          <div style={{ backgroundColor: 'white' }} className="createPost">

            <h2 className="text-center fw-bold">Update Post</h2>
            <div>
              <label htmlFor="exampleInputEmail1">Title</label>
              <input
                type="text"
                name="title"
                value={title}
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
                value={description}
                className="form-control"
                id="inputEmail"
                placeholder="Enter an description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                className="btn btn-primary d-flex justify-content-end mt-2"
                onClick={() => {
                  const updatedPost = localPosts?.map((post) => {
                    if (post.id == postId) {
                      return {
                        ...post,
                        title,
                        body: description
                      }
                    }
                    return post;
                  });
                  localStorage.setItem('posts', JSON.stringify(updatedPost));
                  setLocalPosts(updatedPost);
                  setOpen(false);
                }}
              >
                Update
              </button>
              <button
                className="btn d-flex justify-content-end mt-2"
                style={{ border: '1px solid black' }}
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div >
      </Modal>

      {/* Delete Post Model */}
      <Modal
        open={deleteModel}
        onClose={() => setDeleteModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div className='center d-flex justify-content-center align-items-center'>
          <div style={{ backgroundColor: 'white' }} className="createPost">
            <h2 className="text-center fw-bold">Delete Post</h2>
            <span>Are you sure you want to Delete this Post</span>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                className="btn btn-primary d-flex justify-content-end mt-2"
                onClick={() => {
                  const updatedPost = localPosts?.filter((post) => {
                    if (post.id !== postId) {
                      return {
                        ...post,
                        title,
                        body: description
                      }
                    }
                  });
                  localStorage.setItem('posts', JSON.stringify(updatedPost));
                  setLocalPosts(updatedPost);
                  setDeleteModel(false);
                }}
              >
                Delete
              </button>
              <button
                className="btn d-flex justify-content-end mt-2"
                style={{ border: '1px solid black' }}
                onClick={() => setDeleteModel(false)}
              >
                Cancel
              </button>
            </div>


          </div>
        </div >
      </Modal>

    </div>
  )
}

export default HomePage