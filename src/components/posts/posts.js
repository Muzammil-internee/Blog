import React, { useState, useEffect } from "react"
import axios from "axios";
import Modal from '@mui/material/Modal';

import './posts.css';

const Posts = ({
  postIndex,
  post,
  posts,
  setOpen,
  setTitle,
  setDescription,
  setPostId,
  setDeleteModel
}) => {
  const userId = localStorage.getItem('userId');
  let users = localStorage.getItem('users');
  let userEmail = '';
  if (users?.length) {
    users = JSON.parse(users);
    userEmail = users?.find(item => item.id == userId)?.email;
  }

  const [comments, setComments] = useState([]);
  const [commentModel, setCommentModel] = useState(false);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const [commentIndex, setCommentIndex] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const fetchComments = async () => {
    let { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
    posts[postIndex] = {
      ...posts[postIndex],
      comments: data || []
    };
    localStorage.setItem('posts', JSON.stringify(posts));
    setComments(data || []);
  }

  useEffect(() => {
    if (!post?.comments?.length) {
      fetchComments();
    } else {
      setComments(post?.comments);
    }
  }, []);

  const handleAddComment = () => {
    const tempComments = [...comments];
    if (isUpdatingComment) {
      tempComments[commentIndex] = {
        ...tempComments[commentIndex],
        name: commentName,
        body: commentBody
      }
    } else {
      tempComments.push({
        id: comments.length + 1,
        name: commentName,
        body: commentBody,
        postId: post.id,
        email: userEmail
      });
    }
    posts[postIndex] = {
      ...posts[postIndex],
      comments: tempComments || []
    };
    localStorage.setItem('posts', JSON.stringify(posts));
    setComments(tempComments);
    setCommentModel(false);
    setCommentName('');
    setCommentBody('');
    setIsUpdatingComment(false);
  }

  return (
    <div>
      <div className="postCard" >
        <div className="card divStyle" >
          <div className="card-body">
            <div className="d-flex  justify-content-between">
              <div >
                <div >
                  <h5>Title</h5>
                  <h6 className="card-title align-items-center">{post.title}</h6>
                </div>
                <div >
                  <h5>Description</h5>
                  <h6 className=" justify-content-center align-items-center">{post.body}</h6>
                </div>
              </div>
              <div className="d-flex flex-column  justify-content-between">
                {
                  (userId && post.userId == userId) &&
                  <button onClick={() => {
                    setOpen(true);
                    setTitle(post.title);
                    setDescription(post.body);
                    setPostId(post.id);
                  }}>Edit</button>
                }
                {
                  userId &&
                  <button onClick={() => {
                    setCommentModel(true);
                  }}>Add Comment</button>
                }
                {
                  (userId && post.userId == userId) &&
                  <button
                    onClick={() => {
                      setDeleteModel(true);
                      setPostId(post.id);
                    }}
                  >
                    Delete
                  </button>
                }
              </div>

            </div>

            <hr></hr>

            <div >
              <h5>Comments</h5>
              {
                comments && comments.map(({
                  id: commentId,
                  name,
                  body,
                  email
                }, postIndex) => {
                  return (
                    <div className="d-flex mb-2 p-2 justify-content-between border">
                      <div>
                        <div>
                          Email: {email}
                        </div>
                        <div>
                          Name: {name}
                        </div>
                        <div>
                          Body: {body}
                        </div>
                      </div>
                      <div className="d-flex flex-column  justify-content-between">
                        {
                          (userEmail && userEmail == email) &&
                          <button
                            onClick={() => {
                              setIsUpdatingComment(true);
                              setCommentModel(true);
                              setCommentIndex(postIndex);
                              setCommentName(name);
                              setCommentBody(body);
                            }}
                          >
                            Edit
                          </button>
                        }
                        {
                          (userEmail && userEmail == email) &&
                          <button
                            onClick={() => {
                              const updateComments = comments?.filter((item) => {
                                if (item.id !== commentId) return item
                              });
                              posts[postIndex] = {
                                ...posts[postIndex],
                                comments: updateComments || []
                              };
                              localStorage.setItem('posts', JSON.stringify(posts));
                              setComments(updateComments);
                            }}
                          >
                            Delete
                          </button>
                        }
                      </div>
                    </div>
                  )
                })
              }

            </div>
          </div>
        </div>
      </div>

      {/* Add Comment Model */}
      <Modal
        open={commentModel}
        onClose={() => setCommentModel(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <div className='center d-flex justify-content-center align-items-center'>
          <div style={{ backgroundColor: 'white' }} className="createPost">
            <h2 className="text-center fw-bold">{isUpdatingComment ? "Update a Comment" : "Add a Comment"}</h2>
            <div>
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text"
                name="title"
                value={commentName}
                className="form-control"
                id="inputEmail"
                placeholder="Enter title"
                onChange={(e) => setCommentName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1">Body</label>
              <input
                type="text"
                name="description"
                value={commentBody}
                className="form-control"
                id="inputEmail"
                placeholder="Enter an description"
                onChange={(e) => setCommentBody(e.target.value)}
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <button
                className="btn btn-primary d-flex justify-content-end mt-2"
                onClick={() => {
                  handleAddComment();
                }}
              >
                {isUpdatingComment ? "Update Comment" : "Post Comment"}
              </button>
              <button
                className="btn d-flex justify-content-end mt-2"
                style={{ border: '1px solid black' }}
                onClick={() => {
                  setCommentModel(false);
                  setCommentName('');
                  setCommentBody('');
                  setIsUpdatingComment(false);
                }}
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
export default Posts;