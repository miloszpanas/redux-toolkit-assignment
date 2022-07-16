import { useAppSelector } from "../../hooks/reduxHooks";
import { StatusContainer } from "./styles/PostStyled"
import { Spin, Result } from "antd";
import {
  selectAllPostsSelector,
  getPostsStatusSelector,
} from "../../reducers/Posts/selectors";
import Post from "./Post";

const PostsList: React.FC = (): JSX.Element => {

  const posts = useAppSelector(selectAllPostsSelector);
  const postStatus = useAppSelector(getPostsStatusSelector);

  const renderContent = (status: string) => {
    switch (status) {
      case "loading":
        return (
          <StatusContainer>
            <Spin size="large" />
          </StatusContainer>
        );
      case "failed":
        return (
          <Result
            status="500"
            title="Error"
            subTitle="Sorry, posts could not be fetched."
          />
        );
      case "succeeded":
        const postsOrdered = posts
          .slice()
          .sort((a, b) => b.date.localeCompare(a.date));
        return postsOrdered.map((post) => <Post key={post.id} post={post} />);
    }
  };

  return <section>{renderContent(postStatus)}</section>;
};
export default PostsList;



