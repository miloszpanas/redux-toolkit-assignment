import React from "react";
import { Card, Button } from "antd";
import PostAuthor from "./PostAuthor";
import { TimePassed } from "../../common";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";
import { Post as PostTypes } from "../../reducers/Posts/postSlice";
import "./styles/Post.css";

interface SinglePost {
  post: PostTypes;
}

const Post = ({ post }: SinglePost) => {
  const { body, id, title, date } = post;

  const { Meta } = Card;

  return (
    <article className="post-container">
      <Card
        hoverable
        actions={[
          <ReactionButton post={post} />,
          <Link to={`post/${id}`}>
            <Button type="primary" ghost>Edit Post</Button>
          </Link>,
        ]}
      >
        <Meta title={title} description={body.substring(0, 75)} />
        <div className="details-container">
          <PostAuthor post={post} />
          <TimePassed timestamp={date} />
        </div>
      </Card>
    </article>
  );
};

const MemoizedPost = React.memo(Post);
export default MemoizedPost;
