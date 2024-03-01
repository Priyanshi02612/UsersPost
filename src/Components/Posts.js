import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState();
  const navigateComments = useNavigate();

  useEffect(() => {
    const fetchedPostData = async () => {
      setIsLoading(true);
      try {
        const responsePost = await fetch("https://dummyjson.com/posts");
        const responseUser = await fetch("https://dummyjson.com/users");
        const data = await responsePost.json();
        const usersRes = await responseUser.json();
        const users = usersRes.users || [];

        const fetchedPosts = (data.posts || []).map((post) => {
          const user = users.find((user) => user.id === post.userId);

          return {
            ...post,
            username: user?.username,
          };
        });

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching post data: ", error);
        setError("Error while loading posts");
      }

      setIsLoading(false);
    };

    fetchedPostData();
  }, []);

  const navigateCommentBox = (post) => {
    navigateComments(`/post/post:${post.id}`, { state: { post } });
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
    <div>
      <div className="container-fluid">
        {posts.map((post, index) => (
          <div
            key={index}
            className="container-fluid my-4 d-flex flex-column p-3 post-container"
            onClick={() => navigateCommentBox(post)}
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
    </div>
  );
};

export default Posts;
