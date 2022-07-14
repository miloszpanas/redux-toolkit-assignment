import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Card, Button, Empty } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deletePost } from "../../reducers/Posts/postServices";
import {
  CardContainer,
  DetailsContainer,
  EmptyContainer,
} from "./styles/PostStyled";

import { selectPostsByIdSelector } from "../../reducers/Posts/selectors";
import PostAuthor from "./PostAuthor";
import { TimePassed } from "../../common";
import ReactionButton from "./ReactionButton";

const ViewedPost: React.FC<{}> = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectedPost = useAppSelector((state) =>
    selectPostsByIdSelector(state, Number(id))
  );

  const { Meta } = Card;

  const deletePostHandler = () => {
    try {
      dispatch(deletePost({ id: selectedPost?.id }));
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  if (!selectedPost) {
    return (
      <EmptyContainer>
        <Empty />
      </EmptyContainer>
    );
  }

  return (
    <CardContainer>
      <Card
        hoverable
        actions={[
          <ReactionButton post={selectedPost} />,
          <Link to={`/post/${selectedPost.id}/edit/`}>
            <Button type="primary" ghost>
              Edit Post
            </Button>
          </Link>,
          <Button danger ghost onClick={deletePostHandler}>
            Delete Post
          </Button>,
        ]}
      >
        <Meta
          title={selectedPost.title}
          description={selectedPost.body.substring(0, 100)}
        />
        <DetailsContainer>
          <PostAuthor post={selectedPost} />
          <TimePassed timestamp={selectedPost.date} />
        </DetailsContainer>
      </Card>
    </CardContainer>
  );
};

export default ViewedPost;
