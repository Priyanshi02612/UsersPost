import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPost from "./AddPost";
import { OnAddNewPost, getAllPosts } from "../services/post.service";
import { getAllUsers } from "../services/user.service";

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
      <div className="text-end p-2">
        <a href="#addPostInput">Add Post</a>
      </div>

      <div className="container-fluid">
        {posts.map((post, index) => (
          <div
            key={index}
            className="container-fluid my-4 d-flex flex-column p-3 post-container"
            onClick={() => navigateToPostComments(post)}
          >
            <h3>
              {post.id}. {post.title}
            </h3>
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

      <div className="text-end p-2">
        <a href="#topOfThePage">Go to top</a>
      </div>
    </>
  );
};

export default Posts;
