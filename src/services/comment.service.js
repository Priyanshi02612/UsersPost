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
