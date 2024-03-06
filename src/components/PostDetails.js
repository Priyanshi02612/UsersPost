import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaComment, FaTrash } from "react-icons/fa6";
import AddComment from "./AddComment";
import { getPostsCommentsByPostId } from "../services/post.service";
import {
  handleDeleteCommentById,
  onAddNewComment,
} from "../services/comment.service";

const PostDetails = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [disable, setDisable] = useState(false);
  const navigateToPost = useNavigate();
  const location = useLocation();
  const { post } = location.state || {};

  useEffect(() => {
    const fetchPostsComments = async () => {
      setLoading(true);

      try {
        const postsComments = await getPostsCommentsByPostId(post.id);
        setComments(postsComments);
        // console.log(comments);
      } catch (error) {
        setError("Error fetching comment data...");
        console.error(error);
      }
      setLoading(false);
    };

    fetchPostsComments();
  }, []);

  const onAddComment = async (addedComment) => {
    try {
      setDisable(true);
      const newComment = await onAddNewComment(addedComment, post.id);
      setComments([...comments, newComment]);
      setDisable(false);
    } catch (error) {
      setError("Error while adding comment...");
      console.error(error);
    }
  };

  const onDeleteComment = async (id) => {
    const confirmMessage = window.confirm(
      "Are you sure to delete selected comment?"
    );

    if (confirmMessage) {
      try {
        await handleDeleteCommentById(id);
        const remainingComments = comments.filter(
          (comment) => comment.id !== id
        );
        setComments(remainingComments);
      } catch (error) {
        setError("Error while deleting comment...");
      }
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="text-center">
          <span
            className="spinner-grow spinner-grow-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
          <span
            className="spinner-grow spinner-grow-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
          <span
            className="spinner-grow spinner-grow-sm mx-2"
            role="status"
            aria-hidden="true"
          ></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div>{error}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="container-fluid my-5 comments-container d-flex flex-column p-3">
        <>
          <div className="d-flex justify-content-between mt-3">
            <h3>
              {post.id}. {post.title}
            </h3>
            <button
              className="btn h-50 btn-primary"
              onClick={() => navigateToPost(-1)}
            >
              Back to posts
            </button>
          </div>
          <p className="mt-4">{post.body}</p>
        </>
        {comments.length > 0 ? (
          <>
            <h3>Comments</h3>
            {comments.map((comment, index) => (
              <div key={index} className="container-fluid d-flex flex-column">
                <div className="mt-2 border border-light p-3 d-flex justify-content-between">
                  <span className="d-flex align-items-center gap-2">
                    <FaComment />
                    {comment.body}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    <span className="d-flex align-items-center gap-2 me-2">
                      <FaUser />
                      {comment.user.username}
                    </span>
                    <span className="d-flex align-items-center">
                      <FaTrash onClick={() => onDeleteComment(comment.id)} />
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <hr />
            <div className="h3 text-center">No comments!</div>
          </>
        )}
      </div>
      <AddComment onAddComment={onAddComment} disable={disable} />
    </div>
  );
};

export default PostDetails;
