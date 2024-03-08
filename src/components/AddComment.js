import React, { useState } from "react";

const AddComment = ({ onAddComment, disable }) => {
  const [newCommentData, setNewCommentData] = useState({ body: "" });

  const addNewComment = () => {
    if (newCommentData.body) {
      onAddComment(newCommentData);
    }
    setNewCommentData({ body: "" });
  };

  return (
    <div className="container comments-container text-center my-5 border">
      <>
        <input
          className="form-control mt-3 "
          type="text"
          value={newCommentData.body}
          placeholder="Add comment..."
          onChange={(e) => setNewCommentData({ body: e.target.value })}
        />
      </>
      <button
        className="btn btn-primary my-3 w-25"
        onClick={addNewComment}
        disabled={disable}
      >
        Add to comment
      </button>
    </div>
  );
};

export default AddComment;
