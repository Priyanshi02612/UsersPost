// Add new comment in comment list
export const onAddNewComment = async (addedComment, postId) => {
  const response = await fetch("https://dummyjson.com/comments/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      body: addedComment.body,
      postId: parseInt(postId),
      userId: 10,
    }),
  });
  const newComments = await response.json();
  return newComments;
};

//Delete comment by id
export const handleDeleteCommentById = async (commentId) => {
  const responseDeleteComment = await fetch(
    `https://dummyjson.com/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );

  const deletedComment = await responseDeleteComment.json();
  return deletedComment;
};
