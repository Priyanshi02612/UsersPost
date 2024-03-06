import React, { useState } from "react";

const AddPost = ({ onAddPost, disable }) => {
  const [newPostData, setNewPostData] = useState({ title: "", body: "" });

  const addNewPost = () => {
    onAddPost(newPostData);
    setNewPostData({ title: "", body: "" });
  };

  return (
    <div className="container post-container text-center my-5 border border-dark">
      <>
        <input
          className="form-control mt-3 "
          type="text"
          value={newPostData.title}
          placeholder="Add post title..."
          onChange={(e) => setNewPostData({ title: e.target.value })}
        />
        <input
          className="form-control mt-3 "
          type="text"
          value={newPostData.body}
          placeholder="Add post..."
          onChange={(e) => setNewPostData({ body: e.target.value })}
        />
      </>
      <button
        className="btn btn-primary my-3 w-25"
        onClick={addNewPost}
        disabled={disable}
      >
        Add Post
      </button>
    </div>
  );
};

export default AddPost;
