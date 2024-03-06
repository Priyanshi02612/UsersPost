// Get all posts
export const getAllPosts = async () => {
  const responseOfPosts = await fetch("https://dummyjson.com/posts?limit=150");
  const postsData = await responseOfPosts.json();
  return postsData.posts;
};

// Get Comments of post by post id
export const getPostsCommentsByPostId = async (postId) => {
  const responsePostComments = await fetch(
    `https://dummyjson.com/posts/${postId}/comments`
  );
  const postsCommentsData = await responsePostComments.json();
  return postsCommentsData.comments;
};

//Add new post in post list
export const OnAddNewPost = async (newPostDetails) => {
  const responseNewPost = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: newPostDetails.title,
      body: newPostDetails.body,
      userId: 5,
    }),
  });
  const newPost = await responseNewPost.json();
  newPost.username = "piuspamm0";
  console.log(newPost);
  return newPost;
};

//Delete post by post id
export const handleDeletePostById = async (postId) => {
  const responseDeletePost = await fetch(
    `https://dummyjson.com/posts/${postId}`,
    {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "I think I should shift to the moon",
      }),
    }
  );

  const deletedPost = await responseDeletePost.json();
  return deletedPost;
};
