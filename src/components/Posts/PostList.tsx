import { useAppSelector } from "../../hooks/reduxHooks";
import {
  selectAllPostsSelector,
  getPostsStatusSelector,
  getPostsErrorSelector,
} from "../../reducers/Posts/selectors";
import Post from "./Post";

const PostsList = () => {
  console.log("am i here");
  const posts = useAppSelector(selectAllPostsSelector);
  const postStatus = useAppSelector(getPostsStatusSelector);
  const error = useAppSelector(getPostsErrorSelector);

  console.log("posts", posts);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <Post key={post.id} post={post} />
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section style={{ maxWidth: "45vw" }}>{content}</section>;
};
export default PostsList;
