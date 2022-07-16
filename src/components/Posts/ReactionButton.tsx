import { LikeFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { reactToPost } from "../../reducers/Posts/postSlice";

const ReactionButtons: React.FC<{ thumbsUp: number; id: number }> = ({
  thumbsUp,
  id,
}) => {
  const dispatch = useAppDispatch();

  const onLike = () => dispatch(reactToPost(id));

  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      onClick={onLike}
      icon={<LikeFilled style={{ fontSize: "1.1rem", color: "gold" }} />}
    >
      <span style={{ fontSize: "1.1rem" }}>{thumbsUp}</span>
    </Button>
  );
};
export default ReactionButtons;
