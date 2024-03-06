import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";
import {
  OnAddNewPost,
  getAllPosts,
  handleDeletePostById,
} from "../services/post.service";
import { getAllUsers } from "../services/user.service";
import { FaTrash } from "react-icons/fa6";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [disable, setDisable] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigateToPostDetails = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);

      try {
        const postsList = await getAllPosts();
        const usersList = await getAllUsers();

        const fetchedPosts = (postsList || []).map((post) => {
          const fetchedUser = usersList.find((user) => user.id === post.userId);

          return {
            ...post,
            username: fetchedUser?.username,
          };
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching post data: ", error);
        setError("Error while loading posts");
      }

      setIsLoading(false);
    };

    fetchPostData();
  }, []);

  const navigateToPostComments = (post) => {
    navigateToPostDetails(`/post/post:${post.id}`, { state: { post } });
  };

  const onAddPost = async (newPostDetails) => {
    try {
      setDisable(true);
      const addedNewPost = await OnAddNewPost(newPostDetails);
      setPosts([...posts, addedNewPost]);
      setDisable(false);
    } catch (error) {
      setError("Error while adding post...");
      console.log(error);
    }
  };

  const onDeletePost = async (e, id) => {
    e.stopPropagation();

    const confirmMessage = window.confirm(
      "Are you sure to delete selected post?"
    );

    if (confirmMessage) {
      try {
        await handleDeletePostById(id);
        const remainingPosts = posts.filter((post) => post.id !== id);
        setPosts(remainingPosts);
      } catch (error) {
        setError("Error while deleting comment...");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid">
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
    <>
      <div className="container-fluid">
        {posts.map((post, index) => (
          <div
            key={index}
            className="container-fluid my-4 d-flex flex-column p-3 post-container"
            onClick={() => navigateToPostComments(post)}
          >
            <div className="d-flex align-items-center justify-content-between">
              <h3>
                {post.id}. {post.title}
              </h3>
              <span className="d-flex align-items-center">
                <FaTrash onClick={(e) => onDeletePost(e, post.id)} />
              </span>
            </div>
            <hr />
            <p>{post.body}</p>
            <p className="align-self-end">
              {post.username ? `-By ${post.username}` : " - Anonymous"}
            </p>
          </div>
        ))}
      </div>

      <div id="addPostInput">
        <AddPost onAddPost={onAddPost} disable={disable} />
      </div>

      <div className="text-end position-sticky bottom-0 bg-light p-2">
        <a href="#topOfThePage" className="go-top">
          Go to top
        </a>
      </div>
    </>
  );
};

export default Posts;
