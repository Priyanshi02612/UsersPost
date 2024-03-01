import React, { useState } from "react";

const AddComment = ({ onAddComment }) => {
  const [newCommentData, setNewCommentData] = useState({ body: "" });

  const addNewComment = () => {
    onAddComment(newCommentData);
    // console.log(newCommentData);
    setNewCommentData({ body: "" });
  };

  return (
    <div className="container comments-container text-center my-5 border border-dark">
      <div>
        <input
          className="form-control mt-3 "
          type="text"
          value={newCommentData.body}
          placeholder="Add comment..."
          onChange={(e) => setNewCommentData({ body: e.target.value })}
        />
      </div>
      <button className="btn btn-primary my-3 w-25" onClick={addNewComment}>
        Add to comment
      </button>
    </div>
  );
};

export default AddComment;
