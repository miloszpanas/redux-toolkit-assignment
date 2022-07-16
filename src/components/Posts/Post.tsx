import React from "react";
import { Card, Button } from "antd";
import PostAuthor from "./PostAuthor";
import { TimePassed } from "../../common";
import ReactionButton from "./ReactionButton";
import { Link } from "react-router-dom";
import { Post as PostTypes } from "../../reducers/Posts/postSlice";
import { CardContainer, DetailsContainer } from "./styles/PostStyled";

const Post: React.FC<{ post: PostTypes }> = ({ post }) => {
  const { body, id, title, date, author, thumbsUp } = post;

  const { Meta } = Card;

  return (
    <CardContainer>
      <Card
        hoverable
        actions={[
          <ReactionButton thumbsUp={thumbsUp} id={id} />,
          <Link to={`post/${id}`}>
            <Button type="primary" ghost>
              Show Post
            </Button>
          </Link>,
        ]}
      >
        <Meta title={title} description={body.substring(0, 100)} />
        <DetailsContainer>
          <PostAuthor author={author} />
          <TimePassed timestamp={date} />
        </DetailsContainer>
      </Card>
    </CardContainer>
  );
};

const MemoizedPost = React.memo(Post);
export default MemoizedPost;
