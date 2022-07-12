const PostAuthor = ({ post }: any) => (
  <span>by {post.author ?? "Unknown author"}</span>
);
export default PostAuthor;
