import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { FaComment } from "react-icons/fa6";

const Comments = () => {
  const [commentsData, setCommentsData] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigatePost = useNavigate();
  const location = useLocation();
  const { post } = location.state || {};

  useEffect(() => {
    const fetchedCommentData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dummyjson.com/comments/post/" + post.id
        );
        const commentsArray = await response.json();
        setCommentsData(commentsArray.comments);
      } catch (error) {
        console.error("Error fetching comment data:", error);
      }
      setLoading(false);
    };

    fetchedCommentData();
  }, []);
  // console.log(commentsData);

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

  const addComment = () => {
    if (newComment !== "" && newUserName !== "") {
      const updatedComments = [
        ...commentsData,
        {
          body: newComment,
          user: {
            username: newUserName,
          },
        },
      ];
      // console.log("Updated comments: ", updatedComments);
      setCommentsData(updatedComments);
      setNewComment("");
      setNewUserName("");
    }
  };

  return (
    <div className="container">
      <div className="container-fluid my-5 comments-container d-flex flex-column p-3">
        <div>
          <div className="d-flex justify-content-between mt-3">
            <h3>
              {post.id}. {post.title}
            </h3>
            <button
              className="btn h-50 btn-primary"
              onClick={() => navigatePost(-1)}
            >
              Back to posts
            </button>
          </div>
          <p className="mt-4">{post.body}</p>
          <h3>Comments</h3>
        </div>

        <div>
          {commentsData.map((comment, index) => (
            <div key={index} className="container-fluid d-flex flex-column">
              <div className="mt-2 border border-dark p-3 d-flex justify-content-between">
                <span className="d-flex align-items-center gap-2">
                  <FaComment />
                  {comment.body}
                </span>
                <span className="d-flex align-items-center gap-2">
                  <FaUser />
                  {comment.user.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
