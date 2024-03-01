import React, { useEffect } from "react";

const AddComment = () => {

    useEffect(() => {
        const response = 
    })
  return (
    <div className="container comments-container text-center my-5 border border-dark">
      <div>
        <input
          className="form-control mt-3 "
          type="text"
          value={newComment}
          placeholder="Add comment..."
          onChange={(e) => setNewComment(e.target.value)}
        />
      </div>
      <button className="btn btn-primary my-3 w-25" onClick={addComment}>
        Add to comment
      </button>
    </div>
  );
};

export default AddComment;
