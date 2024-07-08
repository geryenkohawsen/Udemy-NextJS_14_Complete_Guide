interface PostProps {
  author: string; // The author of the post
  body: string; // The body content of the post
}

function Post({ author, body }: PostProps) {
  return (
    <div>
      <p>{author}</p>
      <p>{body}</p>
    </div>
  );
}

export default Post;
