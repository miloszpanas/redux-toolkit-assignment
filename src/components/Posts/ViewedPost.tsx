import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { useAppSelector } from "../../hooks/reduxHooks";

import { selectPostsByIdSelector } from "../../reducers/Posts/selectors";
import PostAuthor from "./PostAuthor";
import { TimePassed } from "../../common";
import ReactionButton from "./ReactionButton";

const ViewedPost = () => {
  const { id } = useParams();
  const selectedPost = useAppSelector((state) =>
    selectPostsByIdSelector(state, Number(id))
  );

  const { Meta } = Card;

  if (!selectedPost) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{selectedPost.title}</h2>
      <p>{selectedPost.body}</p>
      <p className="postCredit">
        <Link to={`/post/${selectedPost.id}/edit/`}>Edit Post</Link>
        <PostAuthor post={selectedPost} />
        <TimePassed timestamp={selectedPost.date} />
      </p>
      <ReactionButton post={selectedPost} />
    </article>
  );

};

export default ViewedPost;
